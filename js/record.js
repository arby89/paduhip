var purpose = '';

(function(_go_) {
	function Sender(url, json, onreadystatechange, ready) {
		console.log('i\'m in ');
		this.url = url;
		this.params = (function(json) {
			var d = new FormData();
			for (var i in json) {
				d.append(i, json[i]);
			}
			return d;
		})(json);
		this.onreadystatechange = onreadystatechange;
		this.ready = ready;
	}


	Sender.prototype.postData = function() {
		var self = this;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			self.onreadystatechange(xmlhttp);
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				self.ready(xmlhttp);
			};
		};

		xmlhttp.open('POST', self.url, true);
		xmlhttp.send(this.params);
	};
	_go_.Sender = Sender;
})(window);

function send() {
	try {
		new Sender('https://script.google.com/macros/s/AKfycbwmvjzdsCyzitWMvI4gfJPSRLTrBw7e_tKG8-QbxYEBJr42LrYc/exec', {
			'email' : document.getElementById('email').value,
			'schoolName' : document.getElementById('schoolName').value,
			'studentEnrolment' : document.getElementById('studentEnrolment').value,
			'meanSchoolHead' : document.getElementById('meanSchoolHead').value,
			'meanTeachers' : document.getElementById('meanTeachers').value,
			'meanStudents' : document.getElementById('meanStudents').value,
			'meanParentCommunity' : document.getElementById('meanParentCommunity').value,
			'immTotalScore' : document.getElementById('immTotalScore').value,
			'immLevel' : document.getElementById('immLevel').value,
			'inClassActivities' : document.getElementById('inClassActivities').value,
			'inClassObjective' : document.getElementById('inClassObjective').value,
			'inClassNoInvolved' : document.getElementById('inClassNoInvolved').value,
			'inClassPercentage' : document.getElementById('inClassPercentage').value,
			'outClassActivities' : document.getElementById('outClassActivities').value,
			'outClassObjective' : document.getElementById('outClassObjective').value,
			'outClassNoInvolved' : document.getElementById('outClassNoInvolved').value,
			'outClassPercentage' : document.getElementById('outClassPercentage').value,
			'extraClassActivities' : document.getElementById('extraClassActivities').value,
			'extraClassObjective' : document.getElementById('extraClassObjective').value,
			'extraClassNoInvolved' : document.getElementById('extraClassNoInvolved').value,
			'extraClassPercentage' : document.getElementById('extraClassPercentage').value,
			'outReachActivities' : document.getElementById('outReachActivities').value,
			'outReachObjective' : document.getElementById('outReachObjective').value,
			'outReachNoInvolved' : document.getElementById('outReachNoInvolved').value,
			'outReachPercentage' : document.getElementById('outReachPercentage').value,
			'outReachPartners' : document.getElementById('outReachPartners').value,
			'addInfoSuccessStories' : document.getElementById('addInfoSuccessStories').value,
			'addInfoChallenges' : document.getElementById('addInfoChallenges').value,
			'purpose' : purpose
		}, function(xmlhttp) {
			document.getElementById('status').innerHTML = JSON.stringify(xmlhttp);
		}, function(xmlhttp) {
			var myArray = eval( xmlhttp.responseText );
			traceOutput(myArray);
		}).postData();
	} catch(e) {
		document.getElementById('myDiv').innerHTML = e.message;
	}
}

function traceOutput(check){
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	if (check == document.getElementById('schoolName').value){
		document.getElementById('modal-value').innerHTML = "This school record already exists.";
		modal.style.display = "block";
		var btn  = document.createElement("INPUT"),
		btn2  = document.createElement("INPUT");
		btn.value = 'Amendment';
		btn.type = 'button';
		btn.id = 'amendment';
		btn2.value = 'Update';
		btn2.type = 'button';
		btn2.id = 'updateRecord';
		document.getElementById('modal-value').appendChild(btn);
		document.getElementById('modal-value').appendChild(btn2);
		$('#amendment').click(function() { purpose = 'Amendment'; send(); purpose = ''; });
		$('#updateRecord').click(function() { purpose = 'Update'; send(); purpose = ''; });
	}
	else{
		document.getElementById('modal-value').innerHTML = "New record successfully added.";
		document.getElementById("reportForm").reset();
        $(".chosen-container-single .chosen-single span").text("");
		modal.style.display = "block";
	}
	span.onclick = function() {
    modal.style.display = "none";
	}
	
	window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
	}
}

function validateForm() {
	var email = document.getElementById('email').value;
	var meanSchoolHead = parseFloat(document.getElementById('meanSchoolHead').value),
		meanTeachers = parseFloat(document.getElementById('meanTeachers').value),
		meanStudents = parseFloat(document.getElementById('meanStudents').value),
		meanParentCommunity = parseFloat(document.getElementById('meanParentCommunity').value)
		schoolName = document.getElementById('schoolName').value;
	
	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
		modalErrorPopop("Email not valid.");
		return false;
	}
	else if (meanSchoolHead > 80 || meanTeachers > 80 || meanStudents > 80 || meanParentCommunity > 80){
		modalErrorPopop("Mean score must lower than 80.");
		return false;
	}
	else if (schoolName == ''){
		modalErrorPopop("Select school name.");
		return false;
	}
	else{send();}
}

function meanLimit(){
	var meanSchoolHead = document.getElementById('meanSchoolHead'),
		meanTeachers = document.getElementById('meanTeachers'),
		meanStudents = document.getElementById('meanStudents'),
		meanParentCommunity = document.getElementById('meanParentCommunity');
	
	meanSchoolHead.value=Math.min(Math.round(80),meanSchoolHead.value);
	meanTeachers.value=Math.min(Math.round(80),meanTeachers.value);
	meanStudents.value=Math.min(Math.round(80),meanStudents.value);
	meanParentCommunity.value=Math.min(Math.round(80),meanParentCommunity.value);
}

function calculateTotal() {	
	//check limit
	meanLimit();
	//set total mean value
	var meanSchoolHead = parseFloat(document.getElementById('meanSchoolHead').value),
		meanTeachers = parseFloat(document.getElementById('meanTeachers').value),
		meanStudents = parseFloat(document.getElementById('meanStudents').value),
		meanParentCommunity = parseFloat(document.getElementById('meanParentCommunity').value);
	
	var totalAmt = meanSchoolHead + meanTeachers + meanStudents + meanParentCommunity;
	document.getElementById('immTotalScore').value = totalAmt;
	
	//set mean level
	if(totalAmt >= 0 && totalAmt < 81){ document.getElementById('immLevel').value = "Level 1"; }
	else if(totalAmt >= 81 && totalAmt < 161){ document.getElementById('immLevel').value = "Level 2"; }
	else if(totalAmt >= 161 && totalAmt < 241){ document.getElementById('immLevel').value = "Level 3"; }
	else if(totalAmt >= 241 ){ document.getElementById('immLevel').value = "Level 4"; }
	
	//get stud enrollment value
	var studentEnrolment = parseInt(document.getElementById('studentEnrolment').value);
	if(isNaN(studentEnrolment))
		studentEnrolment = 0;
	
	// in class
	var inClassNoInvolved = parseInt(document.getElementById('inClassNoInvolved').value);
	if(isNaN(inClassNoInvolved))
		inClassNoInvolved = 0;
	
	var totalInClass = inClassNoInvolved / studentEnrolment * 100;
	if(isNaN(totalInClass))
		totalInClass = 0;
	document.getElementById('inClassPercentage').value = parseFloat(totalInClass).toFixed(2);
	
	// out class
	var outClassNoInvolved = parseInt(document.getElementById('outClassNoInvolved').value);
	if(isNaN(outClassNoInvolved))
		outClassNoInvolved = 0;
	
	var totalOutClass = outClassNoInvolved / studentEnrolment * 100;
	if(isNaN(totalOutClass))
		totalOutClass = 0;
	document.getElementById('outClassPercentage').value = parseFloat(totalOutClass).toFixed(2);
	
	// extra class
	var extraClassNoInvolved = parseInt(document.getElementById('extraClassNoInvolved').value);
	if(isNaN(extraClassNoInvolved))
		extraClassNoInvolved = 0;
	
	var totalExtraClass = extraClassNoInvolved / studentEnrolment * 100;
	if(isNaN(totalExtraClass))
		totalExtraClass = 0;
	document.getElementById('extraClassPercentage').value = parseFloat(totalExtraClass).toFixed(2);
	
	// out reach
	var outReachNoInvolved = parseInt(document.getElementById('outReachNoInvolved').value);
	if(isNaN(outReachNoInvolved))
		outReachNoInvolved = 0;
	
	var totalOutReach = outReachNoInvolved / studentEnrolment * 100;
	if(isNaN(totalOutReach))
		totalOutReach = 0;
	document.getElementById('outReachPercentage').value = parseFloat(totalOutReach).toFixed(2);
	
	//limit checker
	if(inClassNoInvolved > studentEnrolment){
		document.getElementById('inClassNoInvolved').value = 0;
		document.getElementById('inClassPercentage').value = 0;
		modalPopop(studentEnrolment);
	}
	else if(outClassNoInvolved > studentEnrolment){
		document.getElementById('outClassNoInvolved').value = 0;
		document.getElementById('outClassPercentage').value = 0;
		modalPopop(studentEnrolment);
	}
	else if(extraClassNoInvolved > studentEnrolment){
		document.getElementById('extraClassNoInvolved').value = 0;
		document.getElementById('extraClassPercentage').value = 0;
		modalPopop(studentEnrolment);
	}
	else if(outReachNoInvolved > studentEnrolment){
		document.getElementById('outReachNoInvolved').value = 0;
		document.getElementById('outReachPercentage').value = 0;
		modalPopop(studentEnrolment);
	}
	
	
}

function modalPopop(studentEnrolment){
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	
	document.getElementById('modal-value').innerHTML = "Max input must equal or lower than student enrollment value : ["+ studentEnrolment + "] !";
	modal.style.display = "block";
		
	span.onclick = function() {
    modal.style.display = "none";
	}
	
	window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
	}	
}

function modalErrorPopop(errorText){
	var modal = document.getElementById('popupModal');
	var span = document.getElementsByClassName("close2")[0];
	
	document.getElementById('popup-modal-value').innerHTML = errorText;
	modal.style.display = "block";
	
	span.onclick = function() {
    modal.style.display = "none";
	}
	
	window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
	}	
}