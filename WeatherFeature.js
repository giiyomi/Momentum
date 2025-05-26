const getCoordinates = async() =>  {
    return new Promise((resolve,reject) => navigator.geolocation.getCurrentPosition(resolve,reject))
}

const weatherInfoBox = document.querySelector(".weather-app.details")

const weatherDetails = async (params) => {

    try{
        weatherInfoBox.innerHTML = "Searching..."
        const appId = "2b89d0c54fb4cb4a41c236d8fe36399b" 
        let latitude, longitude

        if(params){
            ({ lat: latitude, lng: longitude } = params);
        }else{
            const position = await getCoordinates()
            latitude = position.coords.latitude
            longitude = position.coords.longitude
        }

        const getLocationDetails = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${appId}`)
        const response = await getLocationDetails.json()
        const locationDetails = response[0]

        const weatherUrl = locationDetails && locationDetails?.name ?
        `https://api.openweathermap.org/data/2.5/weather?q=${locationDetails.name},${locationDetails.country}&appid=${appId}&units=metric`:
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appId}&units=metric`;

        const weatherRes = await fetch(weatherUrl)
        const weatherJson = await weatherRes.json()
        sessionStorage.setItem("weatherDetails", JSON.stringify(weatherJson))
        appContent(weatherJson)

    }catch(error){
        console.error(`Location Details Error Message: ${error}`)
    }
};


const placeNameInput = document.getElementById("place-name-input");
const inputFormContainer = document.getElementById("input-form-container");
const dataList = document.getElementById("search-result")
let timeoutId = null;

placeNameInput.addEventListener("input", () => {
    if (!placeNameInput.value){
        return dataList.innerHTML = ""
    }

    const searchResult = JSON.parse(sessionStorage.getItem("searchResult")) || []
    const [city, state, country] = placeNameInput.value.split(", ")
    const placeDetails = searchResult.find(item => item.name == city && item.adminName1 == state && item.countryName == country)
    if (placeDetails) {
        return
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(async() => {
        try {
            const nameOfPlace = placeNameInput.value
            const resultLimit = 10
            const userName = "giiyomi05"

            const response = await fetch(`https://secure.geonames.org/searchJSON?q=${nameOfPlace}&maxRows=${resultLimit}&username=${userName}`)
            const jsonRes = await response.json()
            const data = jsonRes.geonames

            if(data?.length && placeNameInput.value){
                sessionStorage.setItem("searchResult", JSON.stringify(data))
                dataList.innerHTML = "";

                data.forEach((item, index) => {
                    const newOption = document.createElement("option")
                    newOption.classList.add("data-list-option")
                    newOption.value = `${item.name}, ${item.adminName1}, ${item.countryName}`
                    newOption.dataset.index = index
                    dataList.appendChild(newOption)
                })
            }
        } catch (error) {
            console.error(error)
        }
    }, 500);
})

placeNameInput.addEventListener("input" , e => {
    const searchResult = JSON.parse(sessionStorage.getItem("searchResult")) || []
    const [city, state, country] = placeNameInput.value.split(", ")
    const placeDetails = searchResult.find(item => item.name == city && item.adminName1 == state && item.countryName == country) || e.target.value

    dataList.innerHTML = ""

    console.log(placeDetails)
    weatherDetails(placeDetails)
})

inputFormContainer.onsubmit = (e) => {
    e.preventDefault()
    const searchResult = JSON.parse(sessionStorage.getItem("searchResult")) || []
    const [city, state, country] = placeNameInput.value.split(", ")
    const placeDetails = searchResult.find(item => item.name == city && item.adminName1 == state && item.countryName == country) || placeNameInput.value

    dataList.innerHTML = ""
    weatherDetails(placeDetails)
}

const appContent = ( weatherDetails) => {
    weatherInfoBox.innerHTML = "";
    const searchResult = JSON.parse(sessionStorage.getItem("searchResult")) || []
    const [city, state, country] = placeNameInput.value.split(", ")
    const placeDetails = searchResult.find(item => item.name == city && item.adminName1 == state && item.countryName == country)

    if ( weatherDetails.message === "wrong latitude") {


        if(!placeDetails && searchResult.length === 0) {
            return weatherInfoBox.innerHTML = "The place could not be found."
        }

        return weatherInfoBox.innerHTML = "Please select a place from the list."        
    }

    if (placeNameInput.value && placeNameInput.value.length < 3) {
        return weatherInfoBox.innerHTML = "Please select a place from the list."
    }

    weatherInfoBox.innerHTML = "";
    const weatherHeaderSpan = document.createElement("span")
    weatherHeaderSpan.id = "weather-dtails-span"
    weatherHeaderSpan.style.display = "flex"
    weatherHeaderSpan.innerHTML = `Weather in ${weatherDetails.name}`
    weatherInfoBox.appendChild(weatherHeaderSpan)
    const divContainer = document.createElement("div")
    divContainer.classList = "weather-details div"
    weatherInfoBox.appendChild(divContainer)

    const tempFontSize = document.createElement("h1")
    divContainer.appendChild(tempFontSize)
    tempFontSize.innerHTML = `${weatherDetails.main.temp}°C`

    const weatherContainer = document.createElement("div")
    weatherContainer.classList = "weather-container-details"
    divContainer.appendChild(weatherContainer)


    const skyStatusContainer = document.createElement("div")
    skyStatusContainer.classList = "sky-status-container"
    weatherContainer.appendChild(skyStatusContainer)

    const imageElement = document.createElement("img")
    const weatherCode = weatherDetails.weather[0].icon
    imageElement.src = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`
    skyStatusContainer.appendChild(imageElement)

    const skyStatusSpan = document.createElement("span")
    skyStatusSpan.innerHTML = capitalizeFirstLetter(weatherDetails.weather[0].description)
    skyStatusContainer.appendChild(skyStatusSpan)

    const humidityDetails = document.createElement("span")
    humidityDetails.classList = "humidity-details-container"
    humidityDetails.innerHTML = `Humidity: ${weatherDetails.main.humidity}%`
    weatherContainer.appendChild(humidityDetails)

    const windDetails = document.createElement("span")
    windDetails.classList = "wind-details-container"
    windDetails.innerHTML = `Wind Speed: ${weatherDetails.wind.speed} km/h`
    weatherContainer.appendChild(windDetails)

}

function capitalizeFirstLetter(string) {
    const arrOfStr = string.split(' ')
    return arrOfStr.map(letter => letter.charAt(0).toUpperCase() + letter.slice(1)).join(' ') 
}

weatherDetails()