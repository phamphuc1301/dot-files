var iss = 0;

function countDownSS() {
	$.each(userContext.previousAdventureParty.ssItem, function() {
		this.duration_remaining -= 15;
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

var advInterval = setInterval(function() {
	countDownSS();
}, 1E4);