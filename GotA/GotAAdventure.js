var GotABotScope = {

    cache: {},

    countDownSS: function (a) {
        $.each(userContext.previousAdventureParty.ssItem, function () {
            this.duration_remaining -= 35;
            a && console.log("SS id " + this.item_id + " duration remaining " + this.duration_remaining);

            if (this.duration_remaining <= 0) {
                a && console.log("getBatchProgress");
                getBatchProgress(!1, !1);

                setTimeout(function () {
                    $.each(userContext.previousAdventureParty.ssItem, function () {
                        if (this.duration_remaining <= 0) {
                            a && console.log("Send Out SS");
                            adventurePartySend(!1);

                            return false;
                        }
                    });
                }, 5E3);

                return false;
            }
        });
        a && console.log("======================================================");
    },

    productionCountDown: function (a, b, c) {
        if (c === undefined || b === undefined) {
            return;
        }

        var building = userContext.buildingsData[b];
        building.build_remaining -= 35;
        a && console.log("Item id " + building.item_id + " building " + building.symbol + " duration remaining " + building.build_remaining);

        if (isNaN(building.build_remaining) || building.build_remaining <= 0) {
            a && console.log("doFinishProduction");
            doFinishProduction(building.item_id);
            if (isNaN(building.build_remaining) || building.build_remaining <= 0) {
                a && console.log("doProduction");

                var recipesUrl = "/play/recipes?building=" + building.symbol;
                var symbol = building.symbol;

                if (!this.cache[symbol]) {
                    this.cache[symbol] = $.ajax({ url: recipesUrl }).promise();
                }

                this.cache[symbol].done(function (data) {
                    var recipe = data.recipes[c];
                    var url = "/play/set_production/" + recipe.output + "?producer_symbol=" + recipe.category + "&quantity=1&recipe_symbol=" + recipe.symbol;
                    a && console.log("production URL " + url);

                    $.ajax({
                        url: url,
                        success: function (data) {
                            doFinishProduction(building.item_id);
                            a && console.log("doProduction Done");
                        }
                    });
                });
            }
        }
        a && console.log("======================================================");
    },

    barterCountDown: function(a, b) {
        var url = "/pvps/create?pvp%5Btarget_id%5D=" + a + "&pvp%5Bsworn_sword_id%5D=" + b + "&pvp%5Bpvp_action_symbol%5D=barter";
        console.log("Barter url " + url);
        $.ajax({
            url: url,
            success: function (data) {
                console.log("Barter done");
            },
            error: function(data) {
                console.log("SS " + b + " " + data.error);
            }
        });
    }
};

var advInterval = setInterval(function () {
    GotABotScope.countDownSS(true);
}, 6E4);

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
        // Siege works => b = 20, c = 0
        [20, 0],
        // Yard shortbow => b = 21, c = 0
        [21, 0],
        // shanty => b = 22

        // warehouse => b = 23, scroll => c = 0
        [23, 0],
        // armory => b = 24, wood => c = 2
        [24, 2],
        // watch tower => b = 25, tunic => c = 0
        [25, 0]
    ];

    $.each(items, function() {
        GotABotScope.productionCountDown(true, this[0], this[1]);
    });
}, 3E5);

var barterInterval = setInterval(function () {
    // Ramza
    var target = 25356743;
    var ssItems = [];

    $.each(ssItems, function() {
        GotABotScope.barterCountDown(target, this);
    });
}, 6E5);
