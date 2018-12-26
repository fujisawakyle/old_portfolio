$(document).ready(function(){
	
//date variables
var date = new Date(),
today  = date.getDay(),
days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
daysUpdate = [];
	
//json variables
var tog = false,
data, lat, lon, city, region, time, temp, tempMin, tempMax, condition, description, wind, icon, temp1, temp2, temp3, temp4, temp5, temp6, bgURL, night = null, futureArray = [[],[],[],[],[],[]];
	
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
		"top":"25px"});
 }
function showMoon() {
	night = 1;
	$("#moon").show();
	$("#nightSky").show();
	$("#moon").css({"width":"100px",
		"position":"absolute",
		"left":"26%",
		"top":"49px"})
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

//render day the unit changes from API and displays in DOM
function renderDay (data, tog) {
	temp = displayTemp(data.main.temp, tog);
	tempMin = displayTemp(data.main.temp_min, tog);
	tempMax = displayTemp(data.main.temp_max, tog);
	description = data.weather[0].description;
	description = description[0].toUpperCase() + description.substring(1);
	wind = displaySpeed(data.wind.speed, tog);
	sunrise = data.sys.sunrise;
	sunset = data.sys.sunset;
	icon = data.weather[0].icon;
	bgURL = switchBG(icon);
 $("#todayTemp").html(" " + description + "<br />" + 'Temp: ' + temp + "<br />" + 'High/Low: ' + tempMax + "/" + tempMin + "<br />" + 'Wind: ' + wind);
	if (night == 1) {
		$("#todayTemp").css({"color":"white", "background":"rgba(255, 255, 255, 0.07)"})
	}
}
	
//render day the unit changes from API and displays in DOM
function renderWeek (data, tog) {
	for(i=0;i<6;i++){
		generateDays(i);
		futureArray[i][0] = data.list[i+1].temp.day;
		futureArray[i][1] = data.list[i+1].weather[0].icon;
	}
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
	
//creates on array of the next 6 days  
function generateDays(i) {
	if(today == 6){
		today = -1;
	}
	daysUpdate[i] = days[today + 1];
	today++;
}

//fetches the user's location
var fetchLocation = "http://ip-api.com/json"; 
$.getJSON(fetchLocation, function(data){
  lat = data.lat;
  lon = data.lon;
  city = data.city;
  region = data.region;
  
  //fetches API weather data for day  
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon + '&units=imperial&APPID=bdab7e9459aff910128a08e2c5dd37e6';
  $.getJSON(url, function(apiData){
    data = apiData;
    renderDay(apiData, tog);
		if (night == 0){
    	$("#weatherBG").prepend('<h1> Today in ' + city + ", " + region + '</h1>');
		}
		else {
			$("#weatherBG").prepend('<h2> Tonight in ' + city + ", " + region + '</h2>');	
		}
		
		//fetches API weather data for week
		var weekAPI = 'http://api.openweathermap.org/data/2.5/forecast/daily?&units=imperial&APPID=bdab7e9459aff910128a08e2c5dd37e6&lat=' + lat + '&lon=' + lon + '&cnt=7';
		$.getJSON(weekAPI, function(weekData){
			data = weekData;
			renderWeek(weekData, tog);
		});

		//if there's a click on toggle, switch cel and re-render;
		$("#toggle").on("click", function() {
			tog = !tog;
			renderDay(apiData, tog);
		});
		/*//fetches the time (unused)
		var fetchTime = "http://api.timezonedb.com/v2/get-time-zone?key=N6JVQ7FFA9S1&format=json&by=position&lat=" + lat + "&lng=" + lon;
		$.getJSON(fetchTime, function(data){
			time = data.timestamp;
			if (sunrise < time && sunset > time) {
				//$("#sunOrMoon").html('Enjoy the sun while it\'s up!'); 
			} else if (time > sunset) {
				//$("#sunOrMoon").html('What phase is the moon in?');     
			}
		});
		*/
		
  });

});
  
}); 


  
