$(document).ready(function () {

var screenDisplay = '',
		screenResult = '',
		equalToggle = 0,
		pieToggle = 0,
		piCount = 0,
		numClickToggle = 0,
		parenthesisToggle = 0;
	
//exponent functionality	
function exponentExecution (str) {
			var testRegEx = /([0-9]+)\^([0-9]+)/g,
					baseRegExp = /([-+]?[0-9]*\.?[0-9]*)(?=\^)/,
					expRegExp = /\^([-+]?[0-9]*\.?[0-9]*)/,
					result = str.match(testRegEx);
			for (var i = 0; i < result.length; i++){
				var base = baseRegExp.exec(result[i]),
						exponent = expRegExp.exec(result[i]),	
						expExecuted = Math.pow(base[0],exponent[1]),
						str = str.replace(result[i], expExecuted);
			}
			return str;
		}
		
//click black numbers or blue parenthesis
$("#numButtons li").on("click", function () {
  
	//stores number clicked
	var numToShow = $(this).attr('rel');
	
	//check char limit reached
	if (screenDisplay.length - 4*(piCount+1) >= 14) {
		$("#screen").html('<p> Limit Reached<br>' + screenDisplay + '</p>');
	} 
	else {
	//if user inputs a number and PI immediately after - multiply together 
		if (screenResult[screenResult.length-1] == 'I' || screenResult[screenResult.length-1] == 'E') {
			//end parenthesis after pi
			if (numToShow !== ")"){
				screenDisplay += '*';
				screenResult += '*';
				}
				screenDisplay += numToShow;
				screenResult += numToShow;
				pieToggle = 0;
				$("#screen").html('<p><br>' + screenDisplay +'</p>');
			} else {
			//clear display if if 0 on screen or if equal was pressed
				if (screenDisplay === '0' || screenDisplay === 0 || equalToggle === 1 || numClickToggle === 1) {
					screenDisplay = '';
					screenResult = '';
					equalToggle = 0;
					numClickToggle = 0;
					//if . put the 0 back
					if (numToShow === '.'){
							screenDisplay += '0';
					}
				}
				//if user tries to start with ')' send error
				if (numToShow == ')' && screenDisplay == ''){
					$("#screen").html('<p><br>' + 'Error' +'</p>');
				} 
				//multiply functionality of '('
				if (numToShow == '(' && screenDisplay != '' && screenDisplay[screenDisplay.length-1] != '*' && screenDisplay[screenDisplay.length-1] != '%' && screenDisplay[screenDisplay.length-1] != '-' && screenDisplay[screenDisplay.length-1] != '/' && screenDisplay[screenDisplay.length-1] != '.' && screenDisplay[screenDisplay.length-1] != '+'){
					screenDisplay += '*';
					screenResult += '*';
				}
				//multiply pi if number next to it.
				if (pieToggle > 0 ){
					if (numToShow != ')'){
						screenResult += '*';
						screenResult += '*';
					}
					screenResult += numToShow;
					screenDisplay += numToShow;
					$("#screen").html('<p><br>' + screenDisplay + '</p>');
					pieToggle = 0;
				}	 
				else {
					screenResult += numToShow;
					screenDisplay += numToShow;
					$("#screen").html('<p><br>' + screenDisplay +'</p>');
				}
			}
	}    
});

//click on grey math properties
$("#symbolButtons li").on("click", function (){
	//check for screen limit
	if (screenDisplay.length - 4*(piCount+1) >= 14) {
		$("#screen").html('<p> Limit Reached<br>' + screenDisplay + '</p>');
	}	else {   
		//add symbol to screen
		var symbolToShow = $(this).attr('rel');
		screenResult += symbolToShow;
		screenDisplay += symbolToShow;
		$("#screen").html('<p><br>' + screenDisplay + '</p>');
		equalToggle = 0;
		pieToggle = 0;
		numClickToggle = 0;
	}
});
	
//click on exponent button (executed on 'equal' button)
$("#calcButton.expButton").on("click", function () {
	//check for screen limit
	if (screenDisplay.length - 4*(piCount+1) >= 14) {
		$("#screen").html('<p> Limit Reached<br>' + screenDisplay + '</p>');
		} else {
			//error if pressed before other buttons
			if (screenDisplay == '' && screenResult !== '0'){
				$("#screen").html('<p><br>' + 'Error' + '</p>')
			} 
			else {  
				screenResult += '^';
				screenDisplay += '^';
				$("#screen").html('<p><br>' + screenDisplay + '</p');
				//screenDisplay += '^';
				equalToggle = 0;
				pieToggle = 0;
				numClickToggle = 0;
			}
		}    
});

//click on sqrt, log, or ln
$(".numClick").on("click", function (){
	var id = $(this).attr('rel');
	if (id == 'sqrt'){
			screenDisplay = eval(Math.sqrt(screenResult));
	} else if (id == 'log') {
			screenDisplay = eval(Math.log10(screenResult));
	} else if (id == 'ln') {
			screenDisplay = eval(Math.log2(screenResult));
	}
	screenResult = screenDisplay;	
	screenDisplay = screenDisplay.toFixed(2);
	$("#screen").html('<p><br>' + screenDisplay +'</p>');
	equalToggle = 0;
	pieToggle = 0;
	screenResult = screenDisplay;
	numClickToggle = 1;
});

//click on pi or e	
$(".pi-e").on("click", function (){
	//check for screen limit	
	/*if (screenDisplay.length >= (17 + 6*piCount)) {*/
	if (screenDisplay.length - 4*(piCount+1) >= 14) {
			$("#screen").html('<p> Limit Reached<br>' + screenDisplay + '</p>');
	} else {
		var rel = $(this).attr('rel');
		if (rel == 'pi'){
			if (screenDisplay === '' || screenDisplay ==='0' || screenDisplay === 0 || screenDisplay == '&#960;') {
					screenDisplay = '';   
					screenResult = '';
					pieToggle = 1;
					piCount += 1;
			}
			//multiply pi by a number directly next to it.
			if (screenDisplay[screenDisplay.length-1] != ')' && screenDisplay[screenDisplay.length-1] != '(' && screenDisplay !== '0' && screenDisplay !== '' && screenDisplay[screenDisplay.length-1] != '*' && screenDisplay[screenDisplay.length-1] != '%' && screenDisplay[screenDisplay.length-1] != '-' && screenDisplay[screenDisplay.length-1] != '/' && screenDisplay[screenDisplay.length-1] != '.' && screenDisplay[screenDisplay.length-1] != '+'){
					screenResult += '*';
					screenDisplay += '*';
			}
			screenResult += 'Math.PI';
			screenDisplay += '&#960;';
			pieToggle = 1;
			piCount += 1;
		} else if (rel == 'e') {
			if (screenDisplay === '' || screenDisplay ==='0' || screenDisplay === 0 || screenDisplay == 'e') {
					screenDisplay = '';   
					screenResult = '';
					pieToggle = 2;
			}
			//multiply e by a number directly next to it.
			if (screenDisplay[screenDisplay.length-1] != ')' && screenDisplay[screenDisplay.length-1] != '(' && screenDisplay !== '0' && screenDisplay !== '' && screenDisplay !== 0 && screenDisplay[screenDisplay.length-1] != '*' && screenDisplay[screenDisplay.length-1] != '%' && screenDisplay[screenDisplay.length-1] != '-' && screenDisplay[screenDisplay.length-1] != '/' && screenDisplay[screenDisplay.length-1] != '.' && screenDisplay[screenDisplay.length-1] != '+') {
				screenResult += '*';
				screenDisplay += '*';
			}
			screenResult += 'Math.E';
			screenDisplay += 'e';
			pieToggle = 2;
		} 
		$("#screen").html('<p><br>' + screenDisplay +'</p>');
		equalToggle = 0;
		numClickToggle = 0;
	}
});
	
//click on equal button	
$("#calcButton.equalButton").on("click", function (){
		if(screenResult.indexOf('Math.PI') >=0 ){
			var piRegExp = /([0-9]+|\))(?=Math.PI)/;
			var pi2RegExp = /Math.PI([0-9]+)/;
			if (piRegExp.exec(screenResult)) {
			screenResult = screenResult.replace(piRegExp, '$1*');
			}
			if (pi2RegExp.exec(screenResult)){
			screenResult = screenResult.replace(pi2RegExp, 'Math.PI*$1')  
			}
		}
		if (screenResult.indexOf('Math.E') >= 0){
			var eRegExp = /([0-9]+|\))(?=Math.E)/;
			var e2RegExp = /Math.E([0-9]+)/;
			if (eRegExp.exec(screenResult)) {
				screenResult = screenResult.replace(eRegExp, '$1*');
			}
			if (e2RegExp.exec(screenResult)) {
				screenResult = screenResult.replace(e2RegExp, 'Math.E*$1')  
			} 
		}
   
        //add ending parenthesis if user forgets to
        if (screenResult.indexOf('(') >= 0 && screenResult.indexOf(')') < 0) {
            screenResult += ')';
        } 
   
        //add multiplication for parenthesis
        //if there are numbers before or after (), then add * sign so it calculates properly
        var leftparenthesisRegExp = /([0-9]*\.?[0-9]+)(?=\()/;
        
        if (screenResult.indexOf('(') >= 0 && leftparenthesisRegExp.exec(screenResult)) {
            screenResult = screenResult.replace(leftparenthesisRegExp, '$1*');
        }
      
        var rightparenthesisRegExp = /\)([0-9]*\.?[0-9]+)/;
        if (screenResult.indexOf(')') >= 0 && rightparenthesisRegExp.exec(screenResult)) {
            screenResult = screenResult.replace(rightparenthesisRegExp.exec(screenResult)[0], ')*' + rightparenthesisRegExp.exec(screenResult)[1]);
				}
				
				if (screenResult.indexOf("^") > 0){
						screenDisplay = exponentExecution (screenDisplay);
						screenResult = exponentExecution (screenResult);
        } 
				
        screenDisplay = eval(screenResult);
   			if (screenResult.indexOf('.') >= 0) {
        	screenDisplay = screenDisplay.toFixed(2);
				}
        $("#screen").html('<p><br>' + screenDisplay +'</p>');  
        equalToggle = 1;
        pieToggle = 0;
				piCount = 0;
				numClickToggle = 0;
        screenResult = screenDisplay;
    });

//click on clear button
$("#calcButton.clearButton").on("click", function () {
	screenDisplay = 0;
	$("#screen").html('<p><br>' + screenDisplay + '</p>')
	screenResult = '0';
	screenDisplay = '0';
	equalToggle = 0;
	pieToggle = 0;
	piCount = 0;
	numClickToggle = 0;
});
		
//click on delete button	
$("#calcButton.backButton").on("click", function () {
	//if pi, delete whole pi str
	var piDisRegExp = /&#960;$/,
			piResRegExp = /Math.PI$/;
				
	if (piDisRegExp.exec(screenDisplay)){
		screenDisplay = screenDisplay.replace(piDisRegExp, '');
		screenResult = screenResult.replace(piResRegExp, '');
	}
	//otherwise, delete just 1 char
	else {
		screenDisplay = screenDisplay.substr(0, screenDisplay.length-1);
		screenResult = screenResult.substr(0,screenResult.length-1);
	}
	$("#screen").html('<p><br>' + screenDisplay + '</p>')
	equalToggle = 0;
	pieToggle = 0;
	numClickToggle = 0;
});

});