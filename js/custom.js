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
					
		}

	}
	myRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Rexburg,id"); 
	myRequest.send();
	
}



function getClothes(temp){
	
	if (temp <= 50){
		console.log("below 50");
		document.body.style.background = "linear-gradient(180deg, #005b81, #00bedf)";
		document.getElementById("shoes").src = "images/closeToed.svg";
	} else{
		console.log("51 and above");
		document.body.style.background = "linear-gradient(180deg, #F1613C, #F7921E)";
	}
}
