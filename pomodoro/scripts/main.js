$(document).ready(function() {
  var sessionTimer, sessionTimer2, breakDelay;
	
$( "#slider1" ).slider({
	min:1,
	max:60,
	animate:'fast',
	orientation:"horizontal",
  value:25,
  slide: function( event, ui ) {
  	$( "#slider1val" ).val( ui.value );
    }	
});	
	$( "#slider1val" ).val( $( "#slider1" ).slider( "value" ) );
	
	
	$("#sessionReset, #sessionTimer, #breakTimer").hide();

	
	$("#sessionStart").on("click", function () {
		$("#sessionStart, #slider1, #slider2, #sessionTimer, #sessionReset, .sessionLabel, #slider1val, .breakLabel, #min2val").hide();
		$("#sessionReset, #sessionTimer").show();
		$("#sessionBell")[0].play();
		
		
		
		
		//slider minutes into seconds
		slider1Count = $( "#slider1" ).slider( "value" )*60;
		clearInterval(sessionTimer);
		sessionTimer = setInterval (timer, 1000);
function timer(){
   if (slider1Count%60 >=10) {
    $('#sessionTimer').html("Session Time:" + "<br>" + Math.floor(slider1Count/60) + ":" + slider1Count%60);
   }
   else {
    $('#sessionTimer').html("Session Time:" + "<br>" + Math.floor(slider1Count/60) + ":" + "0" + slider1Count%60);
  }
   if (slider1Count === 0) {
		 $("#sessionBell")[0].play();
     clearInterval(sessionTimer);
		 
		 
		 $("#sessionTimer").hide();
		 
		 $("#breakTimer").show();
		 //break time starts
		 slider2Count = $( "#slider2" ).slider( "value" )*60;
		 sessionTimer2 = setInterval (timer2, 1000);
	function timer2(){
   if (slider2Count%60 >=10) {
    $('#breakTimer').html("Break Time:" + "<br>" + Math.floor(slider2Count/60) + ":" + slider2Count%60);
   }
   else {
    $('#breakTimer').html("Break Time:" + "<br>" + Math.floor(slider2Count/60) + ":" + "0" + slider2Count%60);
  }
   if (slider2Count === 0) {
     clearInterval(sessionTimer2);
		 $("#breakBell")[0].play();
   }
	slider2Count -= 1;
}
   }
	slider1Count -= 1;
}
	});
	
	
$( "#slider2" ).slider({
	min:1,
	max:20,
	animate:'fast',
	orientation:"horizontal",
  value:5,
  slide: function( event, ui ) {
  	$( "#min2val" ).val( ui.value );
    }	
});		
	$( "#min2val" ).val( $( "#slider2" ).slider( "value" ) );

	
	
	$("#sessionReset").on("click", function (){
		
		clearInterval(sessionTimer);
		clearInterval(sessionTimer2);
		$('#sessionTimer').html('');
		$('#breakTimer').html('');
		$("#sessionReset, #sessionTimer, #breakTimer").hide();
		$("#slider1, #slider2, #sessionStart, .sessionLabel, #slider1val, .breakLabel, #min2val").show();
		
	});
	
	
	
	
var sessionStartValue = parseInt($("#sessionTime").html());
var sessionCount = sessionStartValue*60;   
var sessionTimer = setInterval (timer, 1000);
  console.log(sessionStartValue);
function timer(){
   sessionCount -= 1;
   if (sessionCount%60 >=10) {
    $('#sessionTime').html(Math.floor(sessionCount/60) + ":" + sessionCount%60);
   }
   else {
    $('#sessionTime').html(Math.floor(sessionCount/60) + ":" + "0" + sessionCount%60);
  }
   if (sessionCount === 0) {
     clearInterval(sessionTimer);
		 
   }
}
  
  
});
