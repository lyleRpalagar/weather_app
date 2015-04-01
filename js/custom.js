// check if the javascript file is working
console.log('custom.js is working');

/* **************************** */
// Connection
// Grab the Api for http://www.zippopotam.us/
/* **************************** */
function getCityName(){
var myCity = new XMLHttpRequest();
	myCity.onreadystatechange = function() {
		if(myCity.readyState == 4 && myCity.status==200) {
			var response2 = myCity.responseText;
			var answer2 = JSON.parse(response2);
			var cityNameDefault = answer2.places[0]['place name'];
			getCity(cityNameDefault);
		};
     };
  myCity.open("GET", "http://api.zippopotam.us/us/83440", true);
  myCity.send();
}
getCityName();

/* **************************** */
// Connection
// Grab the Api for api.openweathermap.org
/* **************************** */
function getWeather() {
	//best pratice to set "waiting..." upfront, not later in the else statement
	//make a new xhr object
	var myRequest = new XMLHttpRequest();	
	myRequest.onreadystatechange = function() {
		//set waiting first, then don't use an else statement
		document.getElementById('loading').innerHTML = "Waiting...";
		if (myRequest.readyState ==4 && myRequest.status==200){	
			document.getElementById('loading').innerHTML = " ";

			var response = myRequest.responseText;
		    var answer = JSON.parse(response);	
			//get the temperature
			var kelvin_temp = answer.main.temp;
				if (kelvin_temp){
				    var far_temp = Math.round((kelvin_temp - 273.15)* 1.8000 + 32.00);
					document.getElementById('temp').innerHTML = far_temp + " degrees";
					getClothes(far_temp);
				}	
		}

	}
	myRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Rexburg,id"); 
	myRequest.send();
	
} 
getWeather();

/* ** you an start using $('#id') or $('.id') like jquery to call your divs ** */
function $(anID){
    return document.querySelector(anID);
}

function getCity(cityNameDefault){
//       $('#city_name_header').innerHTML = cityName;
    $('#city_name').innerHTML = cityNameDefault;
}
function getNewCity(){
    var zipcode = $('#city').value;
     displayNewCity(zipcode);
}

function displayNewCity(zipcode){
	var zipcode = zipcode;
	var myNewCity = new XMLHttpRequest();
	myNewCity.onreadystatechange = function() {
		if(myNewCity.readyState == 4 && myNewCity.status==200) {
			var response2 = myNewCity.responseText;
			var answer2 = JSON.parse(response2);
			var cityNewName = answer2.places[0]['place name'];
            $('#city_name').innerHTML = cityNewName;
		};
     };
  myNewCity.open("GET", "http://api.zippopotam.us/us/"+zipcode, true);
  myNewCity.send();
}


function getClothes(temp){
	
	if (temp <= 50){
		console.log("below 50");
		document.body.style.background = "linear-gradient(180deg, #00bedf, #005b81)";
		document.getElementById("shoes").src = "images/closeToed.svg";
		document.getElementById("weather_icon").src = "images/cloudy.svg";
		document.getElementById("message").src = "images/strut_your_stuff.svg";
	} else{
		console.log("51 and above");
		document.body.style.background = "linear-gradient(180deg, #F7921E, #F1613C)";
	}
}

function hideForm(){
    $('#settings_wrapper').style.marginLeft = '400%';
    animatePlus();
}
function showForm(event){
	event.stopPropagation()
	animatePlus();
}
function doNothing(event){
	event.stopPropagation()
}

/* This function when the plus-sign is clicked it will pulsate */
function animatePlus(){
  if($('#plus-sign').className.indexOf('animated') == 0){ 	    
	    $('#plus-sign').classList.remove('animated');
	    $('#settings_wrapper').style.marginLeft = '400%';
	}else{
	    $('#plus-sign').classList.add('animated');
	    $('#plus-sign').style.transform = 'scale(1)';
	    $('#settings_wrapper').style.marginLeft = '0';
	  }
}





