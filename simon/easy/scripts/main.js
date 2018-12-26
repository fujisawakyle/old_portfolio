$(document).ready(function ( ) {
    
	var gameCount = 0,
			computerCount = 0,
			playerCount = 0,
			randomColor,
			colorChange,
			colorPick,
			randomArray = [],
			playerArray = [];
	
	function generateRandom() {
		return Math.floor(Math.random() * 4 + 1);
	}
	function clearButtons() {
		$("#green").css({"background":"green"})
		$("#red").css({"background":"#b40101"})
		$("#blue").css({"background":"#2650db"})
		$("#yellow").css({"background":"#cbcb39"})
	}
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

	function checkAnswer() {
		
		// try to compare it each time to the substring.
		if (randomArray[playerCount] == playerArray[playerCount]) {
			if (gameCount == playerCount){
				$("#buttonDisabler").show();
				if (gameCount == 4) {
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
		
		
		
	function playerPress() {
		colorPick = playerArray[playerCount];
		pressButton(colorPick);
	}
	
	function pressButton() {
		switch (colorPick) {
			case 1:
				randomColor = 'green';
				$("#" + randomColor).css({"background":"#29e354"});
				 $("#greenSound")[0].play();
				setTimeout(function(){$("#" + randomColor).css({"background":"green"});}, 200);
				break;
			case 2:
				randomColor = 'red';
				$("#" + randomColor).css({"background":"#ff0000"});
				$("#redSound")[0].play();
				setTimeout(function(){$("#" + randomColor).css({"background":"#b40101"});}, 200);
				break;
			case 3:
				randomColor = 'blue';
				$("#" + randomColor).css({"background":"#0045ff"});
				$("#blueSound")[0].play();
				setTimeout(function(){$("#" + randomColor).css({"background":"#2650db"});}, 200);
				break;
			case 4:
				randomColor = 'yellow';
				$("#" + randomColor).css({"background":"yellow"});
				$("#yellowSound")[0].play();
				setTimeout(function(){$("#" + randomColor).css({"background":"#cbcb39"});}, 200);
				break;
		}
	}
		
	
	
	//make array of 20 random from 1 - 4
	
	
	
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
	
	$("#strictButton").on("click",function () {
		if ($("#strictButton").hasClass("OFF")) {
			$("#strictButton").removeClass("OFF");
			$("#strictLight").css({"background":"orange"});
		
			
  	} else {

			$("#strictLight").css({"background":"black"});
			$("#strictButton").addClass("OFF");
		}
	});
	
	//start automatically triggers the sound and light of the button corresponding to the next number of the random array.
	$(".color").on("click", function () {
		
		
	});
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
	
	//if the correct button is pressed, keep the 'player' array and then continue game.
	
	
	//if incorrect:
	//trigger some alert
	
	//NON-STRICT MODE
	//recall continue game function. 
	
	//STRICT MODE
	//make a new random array
	
	//reset the 'player' arrary
	
})