var weaknessSS = userContext.worldEventInfo.challenge.weakness_ss_id;

function getResultsSS(dataSS) {
	console.log("call getResultsSS()");
	$.ajax({
		url:"/play/world_event_attack_results",
		data:{ sworn_sword_id: dataSS.id },
		success: function(b) { 
			b.error ? console.log(b.error) : sendSS(dataSS);
		} 
	});
}

function sendSS(dataSS) {
	console.log("call sendSS()");
	var data = { sworn_sword_id: dataSS.id, order: dataSS.action };
	dataSS.id == weaknessSS && userContext.worldEventInfo.challenge.weakness && (data.weakness_attack = true);
	$.ajax({
		url:"/play/world_event_attack",
		data: data,
		success: function(a){ 
			a.challenge && updateWorldEventChallenge(a.challenge);
		},
		complete: function() {
			console.log("refreshWorldEventChallenge");
			refreshWorldEventChallenge();
		}
	});
}

var worldEventIntervalSS = setInterval(function() {
	console.log("============================================================")
	$.each(userContext.worldEventInfo.challenge.active_swornswords, function() { 
		console.log(this);
		this.cooldown_seconds == 0 && getResultsSS(this);
	});
}, 10000);

var refreshWorldEventSS = setInterval(function() {
	console.log("refreshWorldEventChallenge");
	refreshWorldEventChallenge();
}, 60000);