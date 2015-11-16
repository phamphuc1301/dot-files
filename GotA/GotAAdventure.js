var GotAScope = (function() {
    var cache = {},
        // interval in milliseconds to resend adventure party
        // 6E4 = 60.000 miliseconds = 60 seconds = 1 minute
        advIntervalTimeout = 6E4,
        // interval in milliseconds to rebuild item
        // 3E5 = 300.000 milliseconds = 300 seconds = 5 minutes
        itemIntervalTimeout = 3E5,
        // interval in milliseconds to rebarter
        // 6E5 = 600.000 milliseconds = 600 seconds = 10 minutes
        barterIntervalTimeout = 6E5;
        
    // inject callback to showAdvPartyResponse function
    var showAdvPartyResponseOld = showAdvPartyResponse;
    showAdvPartyResponse = function(b, callback) {
        showAdvPartyResponseOld(b);
        countDownCallBack(userContext.previousAdventureParty.ssItem, true);
    }

    var isTimeout = function(item) {
        return isNaN(item.duration_remaining) || (item.duration_remaining <= 0);
    };

    var countDownCallBack = function(ssItem, log) {
        var timeout = ssItem.some(isTimeout);

        if (timeout) {
            log && console.log('Send out SS');
            adventurePartySend(false);
        }

        return false;
    };

    var countDownSS = function (ssItem, log) {
        var advInterval = advIntervalTimeout / 1E3;
        advInterval += advInterval / 10;

        ssItem.forEach(function(item) {
            item.duration_remaining = item.duration_remaining - advInterval;
            log && console.log('SS id ' + item.item_id + ' duration remaining ' + item.duration_remaining);
        });

        var timeout = ssItem.some(isTimeout);

        if (timeout) {
            log && console.log('getBatchProgress');
            getBatchProgress(false, false);
        }

        log && console.log('======================================================');
    };

    var productionCountDown = function (a, b, c) {
        if (c === undefined || b === undefined) {
            return;
        }

        var building = userContext.buildingsData[b];
        var itemInterval = itemIntervalTimeout / 1E3;
        itemInterval += itemInterval / 10;
        building.build_remaining -= itemInterval;
        a && console.log('Item id ' + building.item_id + ' building ' + building.symbol + ' duration remaining ' + building.build_remaining);

        if (isNaN(building.build_remaining) || building.build_remaining <= 0) {
            a && console.log('doFinishProduction');
            doFinishProduction(building.item_id);
            if (isNaN(building.build_remaining) || building.build_remaining <= 0) {
                a && console.log('doProduction');

                var recipesUrl = '/play/recipes?building=' + building.symbol;
                var symbol = building.symbol;

                if (!cache[symbol]) {
                    cache[symbol] = $.ajax({url: recipesUrl}).promise();
                }

                cache[symbol].done(function (data) {
                    var recipe = data.recipes[c];
                    var url = '/play/set_production/' + recipe.output + '?producer_symbol=' + recipe.category + '&quantity=1&recipe_symbol=' + recipe.symbol;
                    a && console.log('production URL ' + url);

                    $.ajax({
                        url: url,
                        success: function (data) {
                            doFinishProduction(building.item_id);
                            a && console.log('doProduction Done');
                        }
                    });
                });
            }
        }
        a && console.log('======================================================');
    };

    var barterCountDown = function (a, b) {
        if (!a) {
            console.log('Add target id first');
            return;
        }

        var url = '/pvps/create?pvp%5Btarget_id%5D=' + a + '&pvp%5Bsworn_sword_id%5D=' + b + '&pvp%5Bpvp_action_symbol%5D=barter';
        console.log('Barter url ' + url);
        $.ajax({
            url: url,
            success: function (data) {
                data.error ? console.log('SS id=' + b + ' ' + data.error) : console.log('Barter done');
            }
        });
    };

    var advInterval = setInterval(function () {
        countDownSS(userContext.previousAdventureParty.ssItem, true);
    }, advIntervalTimeout);

    var itemInterval = setInterval(function () {
        var items = [
            // smith => b = 2, short sword => c = 1
            [2, 1],
            // village => b = 3, grains => c = 9
            [3, 9],
            // embassy => b = 4, linen => c = 2
            [4, 2],
            // market => b = 5, trander => c = 0
            [5, 0],
            // sept => b = 6, bread => c = 0
            [6, 0],
            // godswood => b = 7, mead => c = 0
            [7, 0],
            // R'hllor => b = 8, flickering fire  => c = 3
            [8, 3],
            // Holdfast => b = 9, doublet => c = 0
            [9, 0],
            // Workshop dirt => b = 10, c = 1
            [10, 1],
            // Treasury = vellum scroll => b = 11, c = 0
            [11, 0],
            // Mine => b = 12, Ore => c = 0
            [12, 0],
            // Reliquary => b = 13, c = 0
            [13, 0],
            // Arbor => b = 14, c = 0
            [14, 0],
            // Glasshouse => b = 15, c = 0
            [15, 0],
            // Fishery => b = 16, c = 0
            [16, 0],
            // Hunting lodge => b = 17, c = 0
            [17, 0],
            // Shipyard => b = 18, c = 0
            [18, 0],
            // Feast => b = 19, c = 0
            [19, 0],
            // Great Hall => b = 20, c = 0
            [20, 0],
            // Siege works => b = 21, c = 0
            [21, 0],
            // Yard shortbow => b = 22, c = 0
            [22, 0],
            // shanty => b = 23, no item

            // warehouse => b = 24, scroll => c = 0
            [24, 0],
            // armory => b = 25, wood => c = 2
            [25, 2],
            // watch tower => b = 26, tunic => c = 0
            [26, 0]
        ];

        items.forEach(function(item) {
            setTimeout(function() {
                productionCountDown(true, item[0], item[1]);
            }, 1E3);
        })
    }, itemIntervalTimeout);

    var barterInterval = setInterval(function () {
        // add target Id here
        var target = 0;
        // add SS id here
        var ssItems = [];
        
        ssItems.forEach(function(item) {
            barterCountDown(target, item); 
        });
    }, barterIntervalTimeout);
    
    
    return {
        stopAdvInterval: function() {
            clearInterval(advInterval);
        }
    }
})();
