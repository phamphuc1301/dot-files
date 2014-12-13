var iss = 0;

function countDownSS(a) {
	$.each(userContext.previousAdventureParty.ssItem, function() {
		var currentSS = this;
		currentSS.duration_remaining -= 35;
		a && console.log("SS id " + currentSS.item_id + " duration remaining " + currentSS.duration_remaining);
		if (currentSS.duration_remaining < 0) {
	    	a && console.log("getBatchProgress");
	    	getBatchProgress(!1,!1);
	    	
	    	setTimeout(function() { 
	    		if (currentSS.duration_remaining < 0) {
	    			a && console.log("Send Out SS");
	    			adventurePartySend(!1);
	    		}
	    	}, 5E3);
	    		
	    	return false;
		}
	});
	a && console.log("======================================================");
}

function productionCountDown(b, a) {
	if (!b) {
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
			var url = '';
			if (b == 3) {
				url = '/play/set_production/grains?producer_symbol=bakery&quantity=1&recipe_symbol=village_center_grains_recipe';
			} else if (b == 6) {
				url = '/play/set_production/fresh_baked_bread?producer_symbol=sept&quantity=1&recipe_symbol=sept_fresh_baked_bread_recipe';
			} else if (b == 7) {
				url = '/play/set_production/mead?producer_symbol=godswood&quantity=1&recipe_symbol=godswood_mead_recipe'
			} else if (b == 8) {
				url = 'play/set_production/nettle_poultice?producer_symbol=rhllor_temple&quantity=1&recipe_symbol=rhllor_temple_nettle_poultice';
			} else {
				console.log("Building number not correct");
				return;
			}
			
			$.ajax({
				url: url,
				success: function(data) {
					doFinishProduction(building.item_id);
					a && console.log("doProduction Done");
				}
			});
		}
	}
	a && console.log("======================================================");
}

var advInterval = setInterval(function() {
	countDownSS(true);
	productionCountDown(3, true);
	productionCountDown(6, true);
	productionCountDown(7, true);
	productionCountDown(8, true);
}, 3E4);
