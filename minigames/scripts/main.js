
	
	var menu = document.querySelector('#menu'),
			topBar = document.querySelector('#topBar'),
			main = document.querySelector('#mainSection'),
			drawer = document.querySelector('.gameNav'),
			simonToggle = document.querySelector('#simonToggle'),
			allToggle = document.querySelector('#allToggle'),
			simonGame = document.querySelector('#simonGame'),
			tttGame = document.querySelector('#tttGame'),
			tttToggle = document.querySelector('#tttToggle');
	
	//open and close the menu
	allToggle.addEventListener('mouseover', function(e) {
  	$('#drawer').addClass('open');
		//e.stopPropagation();
  
	});

	topBar.addEventListener('click', function () {
		$('#drawer').removeClass('open');
	});

	main.addEventListener('mouseover', function(e) {
  	$('#drawer').removeClass('open');
		//e.stopPropagation();
  
	});
	
	function playSimon () {
		$('#allGames,#tictactoeContainer').hide();
		
		$('#simonContainer').show()
		startNew();
		if (gameCount < 10){
					$("#screen").html("0" + (gameCount + 1))	
		} else {
					$("#screen").html((gameCount + 1));
		}
	};

	function playTTT () {
		$('#allGames, #simonContainer').hide();
		
		$('#tictactoeContainer').show()
		restartTTT = 1;
		$("#playPrompt").show();
		startBoard();	
		updateBoard();
		restartTTT = 0;
	}

	let restartTTT;
	allToggle.addEventListener('click', function () {
		drawer.classList.toggle('open');
		$('#allToggle').hide();
		restartTTT = 1;
		$("#greenSound")[0].pause();
		$("#redSound")[0].pause();
		$("#yellowSound")[0].pause();
		$("#blueSound")[0].pause();
		startNew();
		$('#allGames').show();
		$('#simonContainer, #tictactoeContainer').hide();
		
		if (gameCount < 10){
					$("#screen").html("0" + (gameCount + 1))	
		} else {
					$("#screen").html((gameCount + 1));
		}
		$("#playPrompt").show();
		startBoard();	
		updateBoard();
		restartTTT = 0;
	});
	
	simonGame.addEventListener('click', function () {
		playSimon();
		$('#allToggle').show();
	});

	simonToggle.addEventListener('click', function () {
		playSimon();
	});
	
	tttGame.addEventListener('click', function () {
		$('#allToggle').show();
		playTTT();
	});

	tttToggle.addEventListener('click', function () {
		playTTT();
	})
	
	$('#simonContainer, #tictactoeContainer, #allToggle').hide();
	
