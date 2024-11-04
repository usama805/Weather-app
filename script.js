const weatherForm = document.querySelector(".weatherform");

const cityInput = document.querySelector(".city-input");

const card = document.querySelector(".card");

const apikey = "65ebdb7ab58cb4e9a2dc7d21c1b28351";

weatherForm.addEventListener("submit", async event=>{


    event.preventDefault();

    const city = cityInput.value;
    if(city){

        try{

            const weatherData = await getWeatherData(city);
            displayWeatherinfo(weatherData);
        }
        catch(error){

            console.log(error);
            displayError(error);
            
        }

    } else{

        displayError("Please enter the City !");
    }



});


async function getWeatherData(city){
const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric
`;

const response = await fetch(apiurl);

console.log(response);

if(!response.ok){
    throw new Error("Could not fetch weather  data !");
}

return await response.json();

}

function displayWeatherinfo(data){



    const {name: city, main:{temp, humidity}, weather:[{description,id}]} = data;

    card.textContent = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;

    tempDisplay.textContent = `${temp}°F`;
    

    humidityDisplay.textContent = `Humidity ${humidity}%`;

    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descdisplay");
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}


function getWeatherEmoji(weatherId){

switch(true){
    case(weatherId >= 200 && weatherId < 300):
    return "🌧️";
    case(weatherId >= 300 && weatherId < 400):
    return "⛈️";
    case(weatherId >= 500 && weatherId < 600):
    return "⛈️";
    case(weatherId >= 600 && weatherId < 700):
    return "❄️";
    case(weatherId >= 700 && weatherId < 800):
    return "🌨️";
    case(weatherId ===800):
    return "☀️";

    case(weatherId >= 800 && weatherId < 810):
    return "☁️";
    default :
    return "❓";
}
}





function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay); 
}


