
//intiallizing all element constant
const tempfield = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const emojifield = document.querySelector(".weather3 img");
const weatherfield = document.querySelector(".weather3 span");
const searchfield = document.querySelector(".searchfield");
const form = document.querySelector("form");

//default location
let target= "Delhi";
//function to fetch data from weather api
const fetchData = async (target) => {
	try{

	const url =`https://api.weatherapi.com/v1/current.json?key=6ac6481dbb844ac6a5b85847221110&q=${target}`

	const response = await fetch(url);
	const data = await response.json();

	console.log(data);

//Destructuring
	const{
		current:{temp_c,
			condition:{text, icon},
		},
		location:{name, localtime},
	}=data
	// updateDom(data.current.temp_c, data.location.name);

	// calling update function
	updateDom(temp_c, name, localtime, icon, text);
	}
	catch (error){
		alert("Location Not Found");
	}
};

//function to update DOM
function updateDom(temp, city, time, emoji, text){
	tempfield.innerText=(temp)+"°C";
	cityfield.innerText=city;
	
	const exactTime= time.split(" ")[1];
	const exactDate= time.split(" ")[0];
	const exactDay= new Date(exactDate).getDay();
	
	datefield.innerText= `${exactTime}  ${getDayFullName(exactDay)}  ${exactDate}`;

	emojifield.src= emoji;
	weatherfield.innerText=text;
}

fetchData(target);


//function to get name of the day
function getDayFullName(num){
	switch(num){
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";

		default:
		return"Don't Know";
	}
}


//function to search the location
function search (e){
	e.preventDefault();	
	target=searchfield.value;
	fetchData(target)

}
// adding event listener to form
form.addEventListener("submit",search);

//search button
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
	btn.addEventListener('click', function(e){
		let x = e.clientX - e.target.offsetLeft;
		let y = e.clientY - e.target.offsetTop;

		let ripples = document.createElement('span');
		ripples.style.left = x + 'px';
		ripples.style.top = y + 'px';
		this.appendChild(ripples);

		setTimeout(() => {
			ripples.remove()
		},1000);
	})
})
