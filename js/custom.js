// check if the javascript file is working
console.log('custom.js is working');

/* **************************** */
// Connection
// Grab the Api for api.openweathermap.org
/* **************************** */
function getWeather() {
	//best pratice to set "waiting..." upfront, not later in the else statement
	//make a new xhr object
	var myRequest = new XMLHttpRequest();	
	myRequest.onreadystatechange = 
	function() {
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
            var cityName = answer.name;
			//getCity(cityName);
					
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

// function getCity(cityName){
//       $('#city_name_header').innerHTML = cityName;
//       $('#city_name_footer').innerHTML = cityName;

// }

function getClothes(temp){
	
	if (temp <= 50){
		console.log("below 50");
		document.body.style.background = "linear-gradient(180deg, #00bedf, #005b81)";
		document.getElementById("shoes").src = "images/closeToed.svg";
	} else{
		console.log("51 and above");
		document.body.style.background = "linear-gradient(180deg, #F7921E, #F1613C)";
	}
}


/* This function when the plus-sign is clicked it will pulsate */
$('#plus-sign').onclick = function(e){
  $('#plus-sign').classList.add('animated');
// scales the plus-sign to give it a pulsate look 
  $('#plus-sign').style.transform = 'scale(1)';

console.log($('#settings_wrapper').style.display);
	if($('#settings_wrapper').style.display == "none"){
		$('#body').addEventListener('click',function(e) {
		    if(e.target != $('#container') && e.target != $('#footer')) {
		        $('#settings_wrapper').style.display="inline-block";
		        console.log('open settings window');
		    } else {
		       console.log('close setting window');  
		       $('#settings_wrapper').style.display="none";
		       $('#plus-sign').classList.remove('animated');
		    }
		});
		console.log('[closing window]');

	}
};

if($('#plus-sign').className.indexOf('animated') == 0){
      $('#plus-sign').addEventListener('click',function(){
          $('#plus-sign').classList.add('animated');
      });
}

// [ closing window ]





