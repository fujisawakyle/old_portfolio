$(document).ready(function ( ) {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;
  
//date variables
var date = new Date(),
today  = date.getDay(),
days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
daysUpdate = [];
	
//json variables
var tog = false,
data, lat, lon, city, region, time, temp, tempMin, tempMax, condition, description, wind, icon, temp1, temp2, temp3, temp4, temp5, temp6, night = null, futureArray = [[],[],[],[],[],[]];
	
//start weather icons in hidden state
$("#sun, #moon, #cloud, #rain, #lightning, #daySky, #nightSky").hide();
	
//functions that show weather icons
function showSun() {
	night = 0;
	$("#sun").show();
	$("#daySky").show();
	$("#sun").css({"width":"140px",
		"position":"absolute",
		"left":"26%",
		"top":"36px"});
 }
function showMoon() {
	night = 1;
	$("#moon").show();
	$("#nightSky").show();
	$("#moon").css({"width":"100px",
		"position":"absolute",
		"left":"26%",
		"top":"58px"})
 }
function showCloud() {
	$("#cloud").show();
	$("#cloud").css({"width":"140px",
		"position":"absolute",
		"left":"30%",
		"top":"60px"})
 }
function showRain() {
	$("#rain").show();
	$("#rain").css({"width":"140px",
		"position":"absolute",
		"left":"30%",
		"top":"61px"})
 }
function showLightning() {
	$("#lightning").show();
	$("#lightning").css({"width":"140px",
		"position":"absolute",
		"left":"30%",
		"top":"61px"})
 }
function showSnow() {
	$("#snow").show();
	$("#snow").css({"width":"140px",
		"position":"absolute",
		"left":"30%",
		"top":"61px"})
 }	

/*calculates the time
function clock () {
	url2='https://cors-anywhere.herokuapp.com/http://api.geonames.org/timezoneJSON?lat=' + lat + '&lng=' + lon + '&username=fujisawakyle'; 		
	$.getJSON(url2, function(apiData2){
		time = apiData2.time.substr(apiData2.time.length - 5);	
		if (time[0] === '0') {
			time = time.substr(time.length - 4) + 'AM';
		}
		else if(time[0] == '1' || time[0] == '2') {
			var timeadjust = parseInt(time[0])*10 + parseInt(time[1]);
			if (timeadjust >= 12) {
				if (timeadjust > 12) {
					timefinal = timeadjust - 12;
					time = timefinal + time.substr(time.length - 3);

				}
				if (timeadjust == 24) {
					time = time + 'AM';
				}
				else {
					time = time + 'PM';
				}
			} 
			else {
				time = time.substr(time.length - 5) + 'AM';
			}
		}
		$("#time").html(time).css({'position':'absolute', 'margin':'auto', 'left':'0', 'right':'0','font-size':'1.3em', 'top':'40px','color':'white'});
	});	
}	*/
		
//selects correct weather background
function switchBG(val){
	switch (val){
		case '01d':
			//clear sky - day
			showSun();
			break;
		case '01n':
			//clear sky - night
			showMoon();
			break;
		case '02d':
			// few clouds - day
			showSun();
			showCloud();
			break;
		case '02n':
			// few clouds - night
			showMoon();
			showCloud();
			break;
		case '03d':
			// scattered clouds - day
			showSun();
			showCloud();
			break;  
		case '03n':
			 // scattered clouds - night
			showMoon();
			showCloud();
			break;    
		case '04d':
			// broken clouds - day
			showSun();
			showCloud();
			break;  
		case '04n':
			// broken clouds - night
			showMoon();
			showCloud();
			break; 
		case '09d':
			// shower rain - day
			showSun();
			showRain();
			break;  
		case '09n':
			// shower rain - night
			showMoon();
			showRain();
			break;  
		case '10d':
			// rain - day
			showSun();
			showRain();
			break;  
		case '10n':
			// rain - night
			showMoon();
			showRain();
			break;  
		case '11d':
			// thunderstorm - day
			showSun();
			showLightning();
			break;
		case '11n':
			// thunderstorm - night
			showMoon();
			showLightning();
			break;
		case '13d':
			showSun();
			showSnow();
			// snow - day
			break;
		case '13n':
			// snow - night
			showMoon();
			showSnow();
			break;  
		case '50d':
			showSun();
			showCloud();
			//mist - day
			break;
		case '50n':
			//mist - night
			showMoon();
			showCloud();
			break;  
	}
}
	
//selects correct weather icon
function switchIcon(val){
	var weather = "";
	switch (val){
		case '01d':
			//clear sky - day
			weather = '<img style="top:1.75px" id = "sunIcon" src="graphics/sun.png">'
			break;
		case '02d':
			// few clouds - day
			weather = '<img style="top:6px;" src="graphics/cloud.png">'
			break;
		case '03d':
			// scattered clouds - day
			weather = '<img style="top:6px;" src="graphics/cloud.png">'
			break;    
		case '04d':
			// broken clouds - day
			weather = '<img style="top:6px;" src="graphics/cloud.png">'
			break;  
		case '09d':
			// shower rain - day
			weather = '<img src="graphics/rain.png">'
			break; 
		case '10d':
			// rain - day
			weather = '<img src="graphics/rain.png">'
			break;  
		case '11d':
			// thunderstorm - day
			weather = '<img style="top:3px;" src="graphics/lightning.png">'
			break;
		case '13d':
			// snow - day
			weather = '<img style="top:3px;" src="graphics/snow">'
			break;
		case '50d':
			//mist - day
			weather = '<img style="top:6px;" src="graphics/cloud.png">'
			break;
	}		
	return weather;
}
	
//converts temperature unit
function displayTemp(Ftemp, tog){
	if (tog) return Math.round((Ftemp - 32) * (5/9)) + "&#176;" + "C";//C 
	return Math.round(Ftemp) + "&#176;" + "F";//F
}
	
//converts speed unit  
function displaySpeed(mph, tog){
    if (tog) return Math.round((mph * 1.60934)) + " km/h";
    return Math.round(mph) + " mph";
  }

//creates on array of the next 6 days  
function generateDays(i) {
	if(today == 6){
		today = -1;
	}
	daysUpdate[i] = days[today + 1];
	today++;
}	

//creates array of days and weather icons
function determineDay(data) {
	for(i=0;i<6;i++){
		generateDays(i);
		futureArray[i][0] = data.list[i+1].temp.day;
		futureArray[i][1] = data.list[i+1].weather[0].icon;
	}
}		
		
//displays the correct location title, weekdays, and toggle button.		
function showStatic (data) {
	$("#weatherBG").prepend('<button class="btn" id = "toggle">Toggle Units</button>');
	
	city = data.city.name;
	if (night == 1) {
		$("#todayTemp").css({"color":"white", "background":"rgba(255, 255, 255, 0.07)"})
	}
	if (night === 0){
    	$("#weatherBG").prepend('<h1> Today in ' + city + '</h1>');
		}
		else {
			$("#weatherBG").prepend('<h2> Tonight in ' + city + '</h2>');	
		}
	
}			
		
//render day the unit changes from API and displays in DOM
function renderDay (data, tog) {
	temp = displayTemp(data.list[0].temp.day, tog);
	tempMin = displayTemp(data.list[0].temp.min, tog);
	tempMax = displayTemp(data.list[0].temp.max, tog);
	description = data.list[0].weather[0].description;
	description = description[0].toUpperCase() + description.substring(1);
	wind = displaySpeed(data.list[0].speed, tog);
	icon = data.list[0].weather[0].icon;
	switchBG(icon);
	city = data.city.name;
 $("#todayTemp").html(" " + description + "<br />" + 'Temp: ' + temp + "<br />" + 'High/Low: ' + tempMax + "/" + tempMin + "<br />" + 'Wind: ' + wind);
	
	if (night == 1) {
		$("#todayTemp").css({"background":"rgba(255, 255, 255, 0.07)"});
		$("#weatherBG button").css({"background":"rgba(255, 255, 255, 0.07)"});
	}
}	

//render day the unit changes from API and displays in DOM
function renderWeek (data, tog) {
	
	//populates each of the days with day name, weather icon, and temperature
	icon1 = switchIcon(futureArray[0][1]);
	temp1 = displayTemp(futureArray[0][0], tog);
	$("#day1").html('<h1>' + temp1 + '</h1>');
	$("#day1").prepend('<h2>' + daysUpdate[0] + '</h2>');
	$("#day1").prepend(icon1);

	icon2 = switchIcon(futureArray[1][1]);
	temp2 = displayTemp(futureArray[1][0], tog);
	$("#day2").html('<h1>' + temp2 + '</h1>');
	$("#day2").prepend('<h2>' + daysUpdate[1] + '</h2>');
	$("#day2").prepend(icon2);

	icon3 = switchIcon(futureArray[2][1]);
	temp3 = displayTemp(futureArray[2][0], tog);
	$("#day3").html('<h1>' + temp3 + '</h1>');
	$("#day3").prepend('<h2>' + daysUpdate[2] + '</h2>');
	$("#day3").prepend(icon3);

	icon4 = switchIcon(futureArray[3][1]);
	temp4 = displayTemp(futureArray[3][0], tog);
	$("#day4").html('<h1>' + temp4 + '</h1>');
	$("#day4").prepend('<h2>' + daysUpdate[3] + '</h2>');
	$("#day4").prepend(icon4);

	icon5 = switchIcon(futureArray[4][1]);
	temp5 = displayTemp(futureArray[4][0], tog);
	$("#day5").html('<h1>' + temp5 + '</h1>');
	$("#day5").prepend('<h2>' + daysUpdate[4] + '</h2>');
	$("#day5").prepend(icon5);

	icon6 = switchIcon(futureArray[5][1]);
	temp6 = displayTemp(futureArray[5][0], tog);
	$("#day6").html('<h1>' + temp6 + '</h1>');
	$("#day6").prepend('<h2>' + daysUpdate[5] + '</h2>');
	$("#day6").prepend(icon6);
}
	
var url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=7&units=imperial&APPID=bdab7e9459aff910128a08e2c5dd37e6';
		
$.getJSON(url, function(apiData){
    data = apiData;
  	determineDay(apiData);  
		renderDay(apiData, tog);
		renderWeek(apiData, tog);
		showStatic(apiData);
		console.log(night);
		$("#loadSky, #loadMsg").hide();
		$("#toggle").on("click", function() {
			tog = !tog;
			renderDay(apiData, tog);
			renderWeek(apiData, tog);
		});
		//var timer = setInterval (clock, 1000);
});
});
}		
})