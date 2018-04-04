var purpose = 'new';
var cDuplicate = 0;

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
		new Sender('https://script.google.com/macros/s/AKfycbzxhkIFP5UrsFsdNtH1aEFwCgXw_Gj1I2XZMsHxwgsfTXD-Svs/exec', {
			'email' : document.getElementById('email').value,
			'schoolName' : document.getElementById('schoolName').value,
			'studentEnrolment' : document.getElementById('studentEnrolment').value,
			'meanSchoolHead' : document.getElementById('meanSchoolHead').value,
			'meanTeachers' : document.getElementById('meanTeachers').value,
			'meanStudents' : document.getElementById('meanStudents').value,
			'meanParentCommunity' : document.getElementById('meanParentCommunity').value,
			'immTotalScore' : document.getElementById('immTotalScore').value,
			'immLevel' : document.getElementById('immLevel').value,
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
			'purpose' : purpose,
			'cDuplicate' : cDuplicate
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
	if (check[0] == document.getElementById('schoolName').value){
		document.getElementById('modal-value').innerHTML = "This school record already exists.";
		modal.style.display = "block";
		var btn  = document.createElement("INPUT");
		//btn2  = document.createElement("INPUT");
		btn.value = 'Amendment';
		btn.type = 'button';
		btn.id = 'amendment';
		//btn2.value = 'Update';
		//btn2.type = 'button';
		//btn2.id = 'updateRecord';
		document.getElementById('modal-value').appendChild(btn);
		//document.getElementById('modal-value').appendChild(btn2);
		$('#amendment').click(function() { purpose = 'Amendment'; cDuplicate = check[1]; send(); purpose = 'new'; cDuplicate = 0; });
		//$('#updateRecord').click(function() { purpose = 'Update'; cDuplicate = check[1]; send(); purpose = 'new'; cDuplicate = 0; });
		span.onclick = function() {
			modal.style.display = "none";
		}
		
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
	else{
		window.location.replace("thankyou.html");
		/*
		var successMsg = '<div class="mdlSuccess"><h1>Thank You!</h1>';
		successMsg += '<p>Your online reporting has been successfully sent.<br>Please check your email for the copy of your reporting.</p></div>';
		document.getElementById('modal-value').innerHTML = successMsg;
		document.getElementById("reportForm").reset();
        $(".chosen-container-single .chosen-single span").text("");
		modal.style.display = "block";
		
		span.onclick = function() {
			modal.style.display = "none";
			location.reload();
		}
		
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				location.reload();
			}
		}*/
	}
}

function validateForm() {
	var email = document.getElementById('email').value;
	var meanSchoolHead = parseFloat(document.getElementById('meanSchoolHead').value),
		meanTeachers = parseFloat(document.getElementById('meanTeachers').value),
		meanStudents = parseFloat(document.getElementById('meanStudents').value),
		meanParentCommunity = parseFloat(document.getElementById('meanParentCommunity').value),
		schoolName = document.getElementById('schoolName').value,
		studentEnrolment = document.getElementById('studentEnrolment').value,
		outClassActivities = document.getElementById('outClassActivities').value,
		outClassObjective = document.getElementById('outClassObjective').value,
		outClassNoInvolved = document.getElementById('outClassNoInvolved').value,
		extraClassActivities = document.getElementById('extraClassActivities').value,
		extraClassObjective = document.getElementById('extraClassObjective').value,
		extraClassNoInvolved = document.getElementById('extraClassNoInvolved').value,
		outReachActivities = document.getElementById('outReachActivities').value,
		outReachObjective = document.getElementById('outReachObjective').value,
		outReachNoInvolved = document.getElementById('outReachNoInvolved').value,
		outReachPartners = document.getElementById('outReachPartners').value,
		addInfoSuccessStories = document.getElementById('addInfoSuccessStories').value,
		addInfoChallenges = document.getElementById('addInfoChallenges').value;
	
	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
		modalErrorPopop("Email not valid.");
		return false;
	}
	else if (schoolName == ''){
		modalErrorPopop("Select school name.");
		return false;
	}
	else if (studentEnrolment == ''){
		modalErrorPopop("Enter student enrolment value.");
		return false;
	}
	else if (meanSchoolHead > 80 || meanTeachers > 80 || meanStudents > 80 || meanParentCommunity > 80){
		modalErrorPopop("Mean score must lower than 80.");
		return false;
	}
	else if (isNaN(meanSchoolHead) == true || isNaN(meanTeachers) == true || isNaN(meanStudents) == true || isNaN(meanParentCommunity) == true){
		modalErrorPopop("Please enter mean score.");
		return false;
	}
	else if (outClassActivities == ''){
		modalErrorPopop("Enter out of class activities field.");
		return false;
	}
	else if (outClassObjective == ''){
		modalErrorPopop("Enter out of class objective field.");
		return false;
	}
	else if (outClassNoInvolved == ''){
		modalErrorPopop("Enter out of class number of student involved.");
		return false;
	}
	else if (extraClassActivities == ''){
		modalErrorPopop("Enter extra class activities field.");
		return false;
	}
	else if (extraClassObjective == ''){
		modalErrorPopop("Enter extra class objective field.");
		return false;
	}
	else if (extraClassNoInvolved == ''){
		modalErrorPopop("Enter extra class number of student involved.");
		return false;
	}
	else if (outReachActivities == ''){
		modalErrorPopop("Enter outreach activities field.");
		return false;
	}
	else if (outReachObjective == ''){
		modalErrorPopop("Enter outreach objective field.");
		return false;
	}
	else if (outReachNoInvolved == ''){
		modalErrorPopop("Enter outreach number of student involved.");
		return false;
	}
	else if (outReachPartners == ''){
		modalErrorPopop("Enter outreach partners field.");
		return false;
	}
	else if (addInfoSuccessStories == ''){
		modalErrorPopop("Enter success stories field.");
		return false;
	}
	else if (addInfoChallenges == ''){
		modalErrorPopop("Enter challenges field.");
		return false;
	}
	else if (grecaptcha.getResponse().length == 0){
		modalErrorPopop("Please solve the captcha.");
		return false;
	}
	else{send();}
}

function meanLimit(){
	var meanSchoolHead = document.getElementById('meanSchoolHead'),
		meanTeachers = document.getElementById('meanTeachers'),
		meanStudents = document.getElementById('meanStudents'),
		meanParentCommunity = document.getElementById('meanParentCommunity');

	if(meanSchoolHead.value != '')
		if(meanSchoolHead.value < 0)
			meanSchoolHead.value = 0;
		else if(meanSchoolHead.value > 80)
			meanSchoolHead.value = 80;
		
	if(meanTeachers.value != '')
		if(meanTeachers.value < 0)
			meanTeachers.value = 0;
		else if(meanTeachers.value > 80)
			meanTeachers.value = 80;
		
	if(meanStudents.value != '')
		if(meanStudents.value < 0)
			meanStudents.value = 0;
		else if(meanStudents.value > 80)
			meanStudents.value = 80;
		
	if(meanParentCommunity.value != '')
		if(meanParentCommunity.value < 0)
			meanParentCommunity.value = 0;
		else if(meanParentCommunity.value > 80)
			meanParentCommunity.value = 80;
}

function calculateTotal() {	
	//check limit
	meanLimit();
	//set total mean value
	var meanSchoolHead = parseFloat(document.getElementById('meanSchoolHead').value),
		meanTeachers = parseFloat(document.getElementById('meanTeachers').value),
		meanStudents = parseFloat(document.getElementById('meanStudents').value),
		meanParentCommunity = parseFloat(document.getElementById('meanParentCommunity').value);
		
	isNaN(meanSchoolHead) ? meanSchoolHead = 0: meanSchoolHead;
	isNaN(meanTeachers) ? meanTeachers = 0: meanTeachers;
	isNaN(meanStudents) ? meanStudents = 0: meanStudents;
	isNaN(meanParentCommunity) ? meanParentCommunity = 0: meanParentCommunity;
	
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
	if(outClassNoInvolved > studentEnrolment){
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

 function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}

 function isDecimalKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 )
		return false;
	return true;
}

function customCaptcha(){
	var a = Math.ceil(Math.random() * 9)+ '';
	var b = Math.ceil(Math.random() * 9)+ '';
	var c = Math.ceil(Math.random() * 9)+ '';
	var d = Math.ceil(Math.random() * 9)+ '';
	var e = Math.ceil(Math.random() * 9)+ '';

	var code = a + b + c + d + e;
	document.getElementById("txtCaptcha").value = code;
	document.getElementById("CaptchaDiv").innerHTML = code;
}

// Validate input against the generated number
function ValidCaptcha(){
	var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
	var str2 = removeSpaces(document.getElementById('CaptchaInput').value);
	if (str1 == str2){
		return true;
	}else{
		return false;
	}
}

// Remove the spaces from the entered and generated code
function removeSpaces(string){
return string.split(' ').join('');
}

//decimal checker
function toHtmlNumericInput(inputElementId, useCommaAsDecimalSeparator) {
	var textbox = document.getElementById(inputElementId);

	// called when key is pressed
	// in keydown, we get the keyCode
	// in keyup, we get the input.value (including the charactor we've just typed
	textbox.addEventListener("keydown", function _OnNumericInputKeyDown(e) {
		var key = e.which || e.keyCode; // http://keycode.info/

		if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
			// alphabet
			key >= 65 && key <= 90 ||
			// spacebar
			key == 32) {
			e.preventDefault();
			return false;
		}

		if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
			// numbers
			key >= 48 && key <= 57 ||
			// Numeric keypad
			key >= 96 && key <= 105 ||

			// allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			// allow: Ctrl+C
			(key == 67 && e.ctrlKey === true) ||
			// Allow: Ctrl+X
			(key == 88 && e.ctrlKey === true) ||

			// allow: home, end, left, right
			(key >= 35 && key <= 39) ||
			// Backspace and Tab and Enter
			key == 8 || key == 9 || key == 13 ||
			// Del and Ins
			key == 46 || key == 45) {
			return true;
		}


		var v = this.value; // v can be null, in case textbox is number and does not valid
		// if minus, dash 
		if (key == 109 || key == 189) {
			// if already has -, ignore the new one
			if (v[0] === '-') {
				// console.log('return, already has - in the beginning');
				return false;
			}
		}

		if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
			// comma, period and numpad.dot
			key == 190 || key == 188 || key == 110) {
			// console.log('already having comma, period, dot', key);
			if (/[\.,]/.test(v)) {
				// console.log('return, already has , . somewhere');
				return false;
			}
		}
	});

	textbox.addEventListener("keyup", function _OnNumericInputKeyUp(e) {
		var v = this.value;

		if(false) {
		// if (+v) { 
			// this condition check if convert to number success, let it be
			// put this condition will have better performance
			// but I haven't test it with cultureInfo = comma decimal separator, so, to support both . and , as decimalSeparator, I remove this condition
			//                      "1000"  "10.9"  "1,000.9"   "011"   "10c"   "$10"
			//+str, str*1, str-0    1000    10.9    NaN         11      NaN     NaN
		} else if (v) {
			// refine the value
			
			// this replace also remove the -, we add it again if needed
			v = (v[0] === '-' ? '-' : '') + 
				(useCommaAsDecimalSeparator ? 
					v.replace(/[^0-9\,]/g, '') : 
					v.replace(/[^0-9\.]/g, ''));
			
			// remove all decimalSeparator that have other decimalSeparator following. After this processing, only the last decimalSeparator is kept.
			if(useCommaAsDecimalSeparator){
				v = v.replace(/,(?=(.*),)+/g, '');
			} else {
				v = v.replace(/\.(?=(.*)\.)+/g, '');
			}

			//console.log(this.value, v);
			this.value = v; // update value only if we changed it
		}
	});

}