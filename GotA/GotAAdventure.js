var iss = 0;

function countDownSS() {
	$.each(userContext.previousAdventureParty.ssItem, function() {
		this.duration_remaining -= 35;
		console.log("SS id " + this.item_id + " duration remaining " + this.duration_remaining);
		
		if (this.duration_remaining < 0) {
	    	console.log("getBatchProgress");
	    	getBatchProgress(!1,!1);
	    	setTimeout(function() { 
	    		console.log("Send Out SS");
	    		adventurePartySend(!1); }, 5E3);
	    		
	    	return false;
		}
	});
	console.log("======================================================");
}

function breadCountDown() {
	var sept = userContext.buildingsData[6];
	sept.build_remaining -= 35;
	console.log("Bread id " + sept.item_id + " duration remaining " + sept.build_remaining);
	
	if (sept.build_remaining < 0) {
		console.log("doFinishProduction");
		doFinishProduction(sept.item_id);
		if (sept.build_remaining == null) {
			console.log("doProduction");
			doProduction('fresh_baked_bread','sept',undefined,undefined,'sept_fresh_baked_bread_recipe');
		}
	}
	console.log("breadCountDown DONE");
}

var advInterval = setInterval(function() {
	countDownSS();
	breadCountDown();
}, 3E4);
