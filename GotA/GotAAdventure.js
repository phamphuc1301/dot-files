var iss = 0;

function countDownSS() {
	$.each(userContext.previousAdventureParty.ssItem, function() {
		this.duration_remaining -= 10;
		console.log("SS id " + this.item_id + " duration remaining " + this.duration_remaining);
		
		if (this.duration_remaining < 0) {
	    	console.log("Send Out SS");
	    	adventurePartySend(false);
	    	return false;
		}
	});
	console.log("======================================================");
}

var advfi1 = setInterval(function() {
	countDownSS();
	
	if (iss++ > 9) {
		console.log("getBatchProgress");
		getBatchProgress(!1,!1);
		iss = 0;
	}
}, 10000);
