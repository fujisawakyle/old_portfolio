
    
var gameCount = 0,
		computerCount = 0,
		playerCount = 0,
		randomColor,
		colorChange,
		colorPick,
		randomArray = [],
		playerArray = [];

//generates random number for lights
function generateRandom() {
	return Math.floor(Math.random() * 4 + 1);
}
	
//resets the button colors
function clearButtons() {
	$("#green").css({"background":"green"})
	$("#red").css({"background":"#b40101"})
	$("#blue").css({"background":"#2650db"})
	$("#yellow").css({"background":"#cbcb39"})
}

//initiates the game
function startNew() {
	clearButtons();
	gameCount = 0;
	playerCount = 0;
	playerArray = [];	
	for (i=0;i<20;i++) {
		randomNum = generateRandom();
		randomArray[i] = randomNum;
	}	
}

//checks to see if input matches order of lights
function checkAnswer() {
		
	// compare user's input to the substring each time
	if (randomArray[playerCount] == playerArray[playerCount]) {
		if (gameCount == playerCount){
			$("#buttonDisabler").show();
			//win at level 20
			if (gameCount == 19) {
				$("#screen").html('<i class="fa fa-trophy" style="font-size:0.85em"</i>');
				$("#winnerSound")[0].play();
			}
			else {
				gameCount++;
				if (gameCount < 9){
					$("#screen").html("0" + (gameCount + 1))	
				} else {
					$("#screen").html((gameCount + 1));
				}
				computerPress();
			}
		} 
		else {
			playerCount++;			
		}
	}
	else {
		$("#buttonDisabler").show();
		clearButtons();
		if ($("#strictButton").hasClass('OFF')){
			setTimeout(function() {
				$('#screen').html('!!')
				$("#buzzerSound")[0].play();
				setTimeout(function () {
					if (gameCount < 9){
					$("#screen").html("0" + (gameCount + 1))	
				} else {
					$("#screen").html((gameCount + 1));
				}
					computerPress();
				}, 750)
			}, 750)
		}
		else {
			setTimeout(function() {
				$('#screen').html('!!')
				$("#buzzerSound")[0].play();
				gameCount = 0;
				playerCount = 0;
				startNew();
				setTimeout(function () {
					if (gameCount < 10){
					$("#screen").html("0" + (gameCount + 1))	
				} else {
					$("#screen").html((gameCount + 1));
				}
					computerPress();
				}, 750)
			}, 750)
		}
	}
}
	
//plays the correct sequence for the round number.	
function computerPress() {
	computerCount = 0
	var moves = setInterval(function(){
				colorPick = randomArray[computerCount];
				pressButton();
				computerCount++;
			if (computerCount >= gameCount + 1) {
				$("#buttonDisabler").show();
				clearInterval(moves);
				playerCount = 0;
				playerArray = [];
				$("#buttonDisabler").hide();	
			}
			}, 750);
}

//lights up button when player presses it
function playerPress() {
	colorPick = playerArray[playerCount];
	pressButton(colorPick);
}

//highlights the corresponding button	
function pressButton() {
	switch (colorPick) {
		case 1:
			$("#greenSound")[0].currentTime=0;
			randomColor = 'green';
			$("#" + randomColor).css({"background":"#29e354"});
			 $("#greenSound")[0].play();
			setTimeout(function(){$("#" + randomColor).css({"background":"green"});}, 200);
			break;
		case 2:
			$("#redSound")[0].currentTime=0;
			randomColor = 'red';
			$("#" + randomColor).css({"background":"#ff0000"});
			$("#redSound")[0].play();
			setTimeout(function(){$("#" + randomColor).css({"background":"#b40101"});}, 200);
			break;
		case 3:
			$("#blueSound")[0].currentTime=0;
			randomColor = 'blue';
			$("#" + randomColor).css({"background":"#00baff"});
			$("#blueSound")[0].play();
			setTimeout(function(){$("#" + randomColor).css({"background":"#2650db"});}, 200);
			break;
		case 4:
			$("#yellowSound")[0].currentTime=0;
			randomColor = 'yellow';
			$("#" + randomColor).css({"background":"yellow"});
			$("#yellowSound")[0].play();
			setTimeout(function(){$("#" + randomColor).css({"background":"#cbcb39"});}, 200);
			break;
	}
}

//when you press start, it starts a new empty 'player' array.
$("#startButton").on("click", function () {
	startNew();
	if (gameCount < 10){
					$("#screen").html("0" + (gameCount + 1))	
				} else {
					$("#screen").html((gameCount + 1));
				}
	computerPress();
});

//strict mode resets the round to 1 upon incorrect entry.	
$("#strictButton").on("click",function () {
	if ($("#strictButton").hasClass("OFF")) {
		$("#strictButton").removeClass("OFF");
		$("#strictLight").css({"background":"orange"});
	} else {

		$("#strictLight").css({"background":"black"});
		$("#strictButton").addClass("OFF");
	}
});

//light buttons
$("#green").on("click", function () {
	playerArray.push(1);
	playerPress();
	checkAnswer();
});
$("#red").on("click", function () {
	playerArray.push(2);
	playerPress();
	checkAnswer();
});
$("#blue").on("click", function () {
	playerArray.push(3);
	playerPress();
	checkAnswer();
});
$("#yellow").on("click", function () {
	playerArray.push(4);
	playerPress();
	checkAnswer();
});

$('buttonDisabler').show();