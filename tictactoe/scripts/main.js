$(document).ready(function ( ) {

//initial variables
var setBoard, winner = null, player = null, setBoard, random, count, mode, round = 0;

//set up board
function startBoard(){ 
	winner = null;
	count = 0;
	setBoard = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	]
	//resets box visuals		
	$("#mainBox .square").css({"background":"black"})
	$("#box1").prop("disabled",false).html('').removeClass('disabled');
	$("#box2").prop("disabled",false).html('').removeClass('disabled');
	$("#box3").prop("disabled",false).html('').removeClass('disabled');
	$("#box4").prop("disabled",false).html('').removeClass('disabled');
	$("#box5").prop("disabled",false).html('').removeClass('disabled');
	$("#box6").prop("disabled",false).html('').removeClass('disabled');
	$("#box7").prop("disabled",false).html('').removeClass('disabled');
	$("#box8").prop("disabled",false).html('').removeClass('disabled');
	$("#box9").prop("disabled",false).html('').removeClass('disabled');
	if (round == 0){
		$("#box1").html('T');
		$("#box2").html('I');
		$("#box3").html('C');
		$("#box4").html('T');
		$("#box5").html('A');
		$("#box6").html('C');
		$("#box7").html('T');
		$("#box8").html('O');
		$("#box9").html('E');
	}
	round++;
	
	$("#diagonal1Win, #diagonal2Win, #column1Win, #column2Win, #column3Win, #row1Win, #row2Win, #row3Win, #winPrompt").hide();
	$("#movePrompt, #modePrompt, #prompt, #promptOuter").show();
		
	//buttons that hide prompts and choose modes
	$("#playButton").on("click", function () {
		$("#playPrompt").hide();
		startBoard();
	});
	$("#beginner").on("click", function () {
		$("#modePrompt").hide();
		mode = 0;				
	});
	$("#hard").on("click", function () {
		$("#modePrompt").hide();
		mode = 1;				
	});
	$("#oButton").on("click", function () {
		$("#prompt, #promptOuter").hide();
		player = 0;
	});
	$("#xButton").on("click", function () {
		$("#prompt, #promptOuter").hide();
		player = 1;
	});
}	

//set up buttons
function updateBoard() {
	
	//buttons are disabled upon click and correct player piece is displayed. the computer's move is chosen and displayed, move chosen depends on mode chosen.
	$(".square").on("click", function () {
		$("#movePrompt").hide();
	});
	//box 1
	$("#box1").on("click", function () {
		if (!($("#box1").hasClass('disabled'))) {
			 $("#box1").prop("disabled",true);
			$("#box1").addClass('disabled');
			if (player === 0) {
				$("#box1").css({"background":"black"});
				$("#box1").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[0][0] = 'O';
			}
			else {
				$("#box1").css({"background":"black"});
				$("#box1").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[0][0] = 'X';
			}
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}								
	});
	//box 2
	$("#box2").on("click", function () {
		if (!($("#box2").hasClass('disabled'))) {
			$("#box2").prop("disabled",true);
			$("#box2").addClass('disabled');
			if (player === 0) {
				$("#box2").css({"background":"black"});
				$("#box2").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[0][1] = 'O';
			}
			else {
				$("#box2").css({"background":"black"});
				$("#box2").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[0][1] = 'X';
			}			
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}			
	});
		//box 3
	$("#box3").on("click", function () {
		if (!($("#box3").hasClass('disabled'))) {
			$("#box3").prop("disabled",true);
			$("#box3").addClass('disabled');
			if (player === 0) {
				$("#box3").css({"background":"black"});
				$("#box3").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[0][2] = 'O';
			}
			else {
				$("#box3").css({"background":"black"});
				$("#box3").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[0][2] = 'X';
			}		
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
			
		}			
	});
		//box 4
	$("#box4").on("click", function () {
		if (!($("#box4").hasClass('disabled'))) {
			$("#box4").prop("disabled",true);
			$("#box4").addClass('disabled');
			if (player === 0) {
				$("#box4").css({"background":"black"});
				$("#box4").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[1][0] = 'O';
			}
			else {
				$("#box4").css({"background":"black"});
				$("#box4").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[1][0] = 'X';
			}			
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}			
	});
		//box 5
	$("#box5").on("click", function () {
		if (!($("#box5").hasClass('disabled'))) {
			$("#box5").prop("disabled",true);
			$("#box5").addClass('disabled');
			if (player === 0) {
				$("#box5").css({"background":"black"});
				$("#box5").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[1][1] = 'O';
			}
			else {
				$("#box5").css({"background":"black"});
				$("#box5").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[1][1] = 'X';
			}			
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}			
	});
		//box 6
	$("#box6").on("click", function () {
		if (!($("#box6").hasClass('disabled'))) {
			$("#box6").prop("disabled",true);
			$("#box6").addClass('disabled');
			if (player === 0) {
				$("#box6").css({"background":"black"});
				$("#box6").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[1][2] = 'O';
			}
			else {
				$("#box6").css({"background":"black"});
				$("#box6").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[1][2] = 'X';
			}		
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}			
	});
		//box 7
	$("#box7").on("click", function () {
		if (!($("#box7").hasClass('disabled'))) {
			$("#box7").prop("disabled",true);
			$("#box7").addClass('disabled');
			if (player === 0) {
				$("#box7").css({"background":"black"});
				$("#box7").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[2][0] = 'O';
			}
			else {
				$("#box7").css({"background":"black"});
				$("#box7").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[2][0] = 'X';
			}				
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}			
	});
		//box 8
	$("#box8").on("click", function () {
		if (!($("#box8").hasClass('disabled'))) {
			$("#box8").prop("disabled",true);
			$("#box8").addClass('disabled');
			if (player === 0) {
				$("#box8").css({"background":"black"});
				$("#box8").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[2][1] = 'O';
			}
			else {
				$("#box8").css({"background":"black"});
				$("#box8").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[2][1] = 'X';
			}		
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}			
	});
		//box 9
	$("#box9").on("click", function () {
		if (!($("#box9").hasClass('disabled'))) {
			$("#box9").prop("disabled",true);
			$("#box9").addClass('disabled');
			if (player === 0) {
				$("#box9").css({"background":"black"});
				$("#box9").html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
				setBoard[2][2] = 'O';
			}
			else {
				$("#box9").css({"background":"black"});
				$("#box9").html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
				setBoard[2][2] = 'X';
			}				
			count +=1;
			checkWin();
			if (count > 0){
				if (mode == 0){
					playAIEasy();
				}
				else {
					playAIHard();
				}
			}
		}			
	});
}	

//checks rows for a win
function rowCheck (i) {
	//chooses color of winning strikethrough
	if (winner == 0) {
		$("#row1Win, #row2Win, #row3Win").css({"background":"red"});
	} else {
		$("#row1Win, #row2Win, #row3Win").css({"background":"yellow"});
	}
	//strikethrough for a row 1 win
	if (i === 0) {
		$("#row1Win").css({"position":"absolute","height":"260px","width":"10px","top":"-82px","left":"145px","transform": "rotate(90deg)","z-index": "1"});
		$("#row1Win").show();
	}
	//strikethrough for a row 2 win
	else if (i == 1) {
		$("#row2Win").css({"position":"absolute","height":"260px","width":"10px","top":"30px","left":"145px","transform": "rotate(90deg)","z-index": "1"});
		$("#row2Win").show();			 
	}
	//strikethrough for a row 3 win		
	else if (i == 2){
		$("#row2Win").css({"position":"absolute","height":"260px","width":"10px","top":"141px","left":"145px","transform": "rotate(90deg)","z-index": "1"});
		$("#row3Win").show();
	}
}
	
//checks columns for a win	
function columnCheck (i) {
	//chooses color of winning strikethrough
	if (winner == 0) {
		$("#column1Win, #column2Win, #column3Win").css({"background":"red"});
	} else {
		$("#column1Win, #column2Win, #column3Win").css({"background":"yellow"});
	}
	//strikethrough for a row 1 win
	if (i === 0) {
		$("#column1Win").css({"position":"absolute","height":"258px","width":"10px","top":"30px","left":"34px","z-index":"1"});
		$("#column1Win").show();
	}
	//strikethrough for a row 2 win		
	else if (i == 1) {
		$("#column2Win").css({"position":"absolute","height":"258px","width":"10px","top":"30px","left":"145px","z-index":"1"});
		$("#column2Win").show();			 
	}
	//strikethrough for a row 3 win		
	else if (i == 2){
		$("#column3Win").css({"position":"absolute","height":"258px","width":"10px","top":"30px","left":"255px","z-index":"1"});
		$("#column3Win").show();
	}
}
	
//checks diagonal1 for a win	
function diagonal1Win () {
	//strikethrough for a diagonal 1 win	
	$("#diagonal1Win").css({"position":"absolute","height":"345px","width":"10px","top":"-15px","left":"145px","transform":"rotate(-45deg)","z-index":"1"});
	//chooses color of winning strikethrough
	if (winner == 0) {
		$("#diagonal1Win").css({"background":"red"});
	} else {
		$("#diagonal1Win").css({"background":"yellow"});
	}
	$("#diagonal1Win").show();
}

//checks diagonal2 for a win	
function diagonal2Win () {
	//strikethrough for a diagonal 2 win
	$("#diagonal2Win").css({"position":"absolute","height":"345px","width":"10px", "top":"-15px","left":"144px","transform":"rotate(45deg)","z-index":"1"});
	//chooses color of winning strikethrough
	if (winner == 0) {
		$("#diagonal2Win").css({"background":"red"});
	} else {
		$("#diagonal2Win").css({"background":"yellow"});
	}
	$("#diagonal2Win").show();
}
	
//check for a winner
function checkWin() {
	
	//straight wins
	for (var i=0;i<3;i++){
		// check rows
		if (setBoard[i][0] == 'X' && setBoard[i][1] == 'X' && setBoard[i][2] == 'X'){
			winner = 1;	
			rowCheck(i);		
			xWins();	
		} 
		else if(setBoard[i][0] == 'O' && setBoard[i][1] == 'O' && setBoard[i][2] == 'O') {
			winner = 0;
			rowCheck(i);
			oWins();
		}
		// check columns
		else if (setBoard[0][i] == 'X' && setBoard[1][i] == 'X' && setBoard[2][i] == 'X'){
			winner = 1;
			columnCheck(i);
			xWins();
		} 
		else if(setBoard[0][i] == 'O' && setBoard[1][i] == 'O' && setBoard[2][i] == 'O'){
			winner = 0;
			columnCheck(i);
			oWins();
		}
	}
	
	//diagonal wins
	if (setBoard[0][0] == 'X' && setBoard[1][1] == 'X' && setBoard[2][2] == 'X'){
			winner = 1;
			diagonal1Win();
			xWins();
		} 
		else if(setBoard[0][0] == 'O' && setBoard[1][1] == 'O' && setBoard[2][2] == 'O') {
			winner = 0;
			diagonal1Win();
			oWins();
		}
	else if (setBoard[2][0] == 'X' && setBoard[1][1] == 'X' && setBoard[0][2] == 'X'){
			winner = 1;
			diagonal2Win();
			xWins();
		} 
		else if(setBoard[2][0] == 'O' && setBoard[1][1] == 'O' && setBoard[0][2] == 'O') {
			winner = 0;
			diagonal2Win();
			oWins();
		}
	
	//checks for tie game
	else if (winner == null && count == 10) {
		tieGame();
	}	
}

//the computer player looks for places to either win the game or block the player from winning	
function checkWinningMove(piece)	{
	// Horizontal
 	if (setBoard[0][1] == piece && setBoard[0][2] == setBoard[0][1] && setBoard[0][0] == '') return 1;
	if (setBoard[0][0] == piece && setBoard[0][0] == setBoard[0][2] && setBoard[0][1] == '') return 2;
	if (setBoard[0][0] == piece && setBoard[0][0] == setBoard[0][1] && setBoard[0][2] == '') return 3;

	if (setBoard[1][1] == piece && setBoard[1][2] == setBoard[1][1] && setBoard[1][0] == '') return 4;
  if (setBoard[1][0] == piece && setBoard[1][0] == setBoard[1][2] && setBoard[1][1] == '') return 5;
	if (setBoard[1][0] == piece && setBoard[1][0] == setBoard[1][1] && setBoard[1][2] == '') return 6;
  
	if (setBoard[2][1] == piece && setBoard[2][2] == setBoard[2][1] && setBoard[2][0] == '') return 7;
  if (setBoard[2][0] == piece && setBoard[2][0] == setBoard[2][2] && setBoard[2][1] == '') return 8;
  if (setBoard[2][0] == piece && setBoard[2][0] == setBoard[2][1] && setBoard[2][2] == '') return 9;

  // Vertical
  if (setBoard[1][0] == piece && setBoard[1][0] == setBoard[2][0] && setBoard[0][0] == '') return 1;
  if (setBoard[0][0] == piece && setBoard[0][0] == setBoard[2][0] && setBoard[1][0] == '') return 4;
  if (setBoard[0][0] == piece && setBoard[0][0] == setBoard[1][0] && setBoard[2][0] == '') return 7;

  if (setBoard[1][1] == piece && setBoard[1][1] == setBoard[2][1] && setBoard[0][1] == '') return 2;
	if (setBoard[0][1] == piece && setBoard[0][1] == setBoard[2][1] && setBoard[1][1] == '') return 5;
	if (setBoard[0][1] == piece && setBoard[0][1] == setBoard[1][1] && setBoard[2][1] == '') return 8;
	
  if (setBoard[1][2] == piece && setBoard[1][2] == setBoard[2][2] && setBoard[0][2] == '') return 3;
	if (setBoard[0][2] == piece && setBoard[0][2] == setBoard[2][2] && setBoard[1][2] == '') return 6;
	if (setBoard[0][2] == piece && setBoard[0][2] == setBoard[1][2] && setBoard[2][2] == '') return 9;
	
  // Diagonal
  if (setBoard[1][1] == piece && setBoard[1][1] == setBoard[2][2] && setBoard[0][0] == '') return 1;
	if (setBoard[0][0] == piece && setBoard[0][0] == setBoard[2][2] && setBoard[1][1] == '') return 5;
	if (setBoard[0][0] == piece && setBoard[0][0] == setBoard[1][1] && setBoard[2][2] == '') return 9;

  if (setBoard[1][1] == piece && setBoard[1][1] == setBoard[2][0] && setBoard[0][2] == '') return 3;
	if (setBoard[0][2] == piece && setBoard[0][2] == setBoard[2][0] && setBoard[1][1] == '') return 5;
	if (setBoard[0][2] == piece && setBoard[0][2] == setBoard[1][1] && setBoard[2][0] == '') return 7;
	
	return 0;
}

//outlines the best moves if the computer cannot win or block.	
function bestMove(piece) {
	var other;
	if (piece == 'O'){
		other = 'X';
	}
	else {
		other = 'O'
	}
	
	//chooses opening moves to set up for rest of the game.
	if (setBoard[1][1] == piece) {
		if (setBoard [0][0] == other && setBoard[2][2] == other && setBoard[1][2] == '') {
			return 6;
		}
		if (setBoard [0][2] == other & setBoard[2][0] == other && setBoard[0][1] == '') {
		return 4;
		}
		if (setBoard[0][0] == other && setBoard[2][1] == other && setBoard[2][0] == ''){
			return 7;
		}
		if (setBoard[0][2] == other && setBoard[2][1] == other && setBoard[2][2] == ''){
			return 9;
		}
		if (setBoard[0][0] == other && setBoard[1][2] == other && setBoard[0][2] == ''){
			return 3;
		}
		if (setBoard[2][0] == other && setBoard[1][2] == other && setBoard[2][2] == ''){
			return 9;
		}
		if (setBoard[0][2] == other && setBoard[1][0] == other && setBoard[0][0] == ''){
			return 1;
		}
		if (setBoard[2][2] == other && setBoard[1][0] == other && setBoard[0][2] == ''){
			return 7;
		}
		if (setBoard[0][2] == other && setBoard[0][1] == other && setBoard[0][0] == ''){
			return 1;
		}
		if (setBoard[2][2] == other && setBoard[0][1] == other && setBoard[0][2] == ''){
			return 3;
		}
	} 
	
	//best moves in order of importance
	if(setBoard[1][1] == '') {
		return 5;
	}
	else if (setBoard[0][0] == '') {
		return 1;
	} 
	else if (setBoard[0][2] == '') {
		return 3;
	} 
	else if (setBoard[2][0] == '') {
		return 7;
	}
	else if (setBoard[2][2] == '') {
		return 9;
	} 
	else if (setBoard[0][1] == '') {
		return 2;
	} 
	else if (setBoard[1][0] == '') {
		return 4;
	} 
	else if (setBoard[1][2] == '') {
		return 6;
	}
	else if (setBoard[2][1] == '') {
		return 8;
	}
}
	
//random playing AI when rookie mode is chosen.	
function playAIEasy() {
	count++;
	random = generateRandom();
	//chooses a random box to fil that hasn't been filled.
	var aiMove = "#box" + random;
	if (player == 0){
		while ($(aiMove).hasClass('disabled')){
			random = generateRandom();
			aiMove = "#box" + random;
		}
		$(aiMove).css({"background":"black"});
		$(aiMove).html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
		$(aiMove).addClass('disabled');
		switch (random) {
			case 1:
				setBoard[0][0] = 'X';
				break;
			case 2:
				setBoard[0][1] = 'X';
				break;
			case 3:
				setBoard[0][2] = 'X';
				break;
			case 4:
				setBoard[1][0] = 'X';
				break;
			case 5:
				setBoard[1][1] = 'X';
				break;
			case 6:
				setBoard[1][2] = 'X';
				break;
			case 7:
				setBoard[2][0] = 'X';
				break;
			case 8:
				setBoard[2][1] = 'X';
				break;
			case 9:
				setBoard[2][2] = 'X';
				break;	
		}
	}
	if (player == 1){
		while (($(aiMove).hasClass('disabled')) && count <9 ){
			random = generateRandom();
			aiMove = "#box" + random;
		}
		$(aiMove).css({"background":"black"});
		$(aiMove).html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
		$(aiMove).addClass('disabled');
		switch (random) {
			case 1:
				setBoard[0][0] = 'O';
				break;
			case 2:
				setBoard[0][1] = 'O';
				break;
			case 3:
				setBoard[0][2] = 'O';
				break;
			case 4:
				setBoard[1][0] = 'O';
				break;
			case 5:
				setBoard[1][1] = 'O';
				break;
			case 6:
				setBoard[1][2] = 'O';
				break;
			case 7:
				setBoard[2][0] = 'O';
				break;
			case 8:
				setBoard[2][1] = 'O';
				break;
			case 9:
				setBoard[2][2] = 'O';
				break;	
		}
	}
	checkWin();
}

//computer checks for a winning move, then checks for blocking move, then implements 'best move' algorithm.
function playAIHard() {
	count++;
	if (player == 0){
		var victory = checkWinningMove('X');
		if (victory > 0) {
			aiMove = "#box" + victory;	
		}
		else {
			var block = checkWinningMove('O');
			if (block > 0) {
				aiMove = "#box" + block;	
			}
			else {
				var best = bestMove('X');
				aiMove = "#box" + best;	
			}
		}
		$(aiMove).css({"background":"black"});
		$(aiMove).html("<i style= 'color:yellow; ;'class='fa fa-star-o'></i>");
		$(aiMove).addClass('disabled');
		var update = aiMove[aiMove.length -1];
		switch (update) {
			case '1':
				setBoard[0][0] = 'X';
				break;
			case '2':
				setBoard[0][1] = 'X';
				break;
			case '3':
				setBoard[0][2] = 'X';
				break;
			case '4':
				setBoard[1][0] = 'X';
				break;
			case '5':
				setBoard[1][1] = 'X';
				break;
			case '6':
				setBoard[1][2] = 'X';
				break;
			case '7':
				setBoard[2][0] = 'X';
				break;
			case '8':
				setBoard[2][1] = 'X';
				break;
			case '9':
				setBoard[2][2] = 'X';
				break;	
		}
	} else {
		var victory = checkWinningMove('O');
		if (victory > 0) {
			aiMove = "#box" + victory;	
		}
		else {
			var block = checkWinningMove('X');
			if (block > 0) {
				aiMove = "#box" + block;	
			}
			else {
				var best = bestMove('O');
				aiMove = "#box" + best;	
			}
		}
		$(aiMove).css({"background":"black"});
		$(aiMove).html("<i style= 'color:red; ;'class='fa fa-heart-o'></i>");
		$(aiMove).addClass('disabled');
		var update = aiMove[aiMove.length -1];
		switch (update) {
			case '1':
				setBoard[0][0] = 'O';
				break;
			case '2':
				setBoard[0][1] = 'O';
				break;
			case '3':
				setBoard[0][2] = 'O';
				break;
			case '4':
				setBoard[1][0] = 'O';
				break;
			case '5':
				setBoard[1][1] = 'O';
				break;
			case '6':
				setBoard[1][2] = 'O';
				break;
			case '7':
				setBoard[2][0] = 'O';
				break;
			case '8':
				setBoard[2][1] = 'O';
				break;
			case '9':
				setBoard[2][2] = 'O';
				break;	
		}
	}
	checkWin();
}		
	
//prompt for x winning	
function xWins() {
	$("#winPrompt").html('<i class = "fa fa-star-o"></i> wins!');
	$("#winPrompt").show();
	$("#playPrompt").show();
	$("#promptOuter").show();
	count = 0;
}
	
//prompt for o winning	
function oWins() {
	$("#winPrompt").html('<i class = "fa fa-heart-o"></i> wins!');
	$("#winPrompt").show();
	$("#playPrompt").show();
	$("#promptOuter").show();
	count = 0;
}
	
//prompt for tie game	
function tieGame() {
	$("#winPrompt").html('Tie!');
	$("#winPrompt").show();
	$("#playPrompt").show();
	$("#promptOuter").show();
}
	
//generates random number for rookie mode	
function generateRandom(){
	return Math.floor(Math.random() * 9 + 1);
}

//begin game
	$("#playPrompt").show();
	startBoard();	
	updateBoard();

})