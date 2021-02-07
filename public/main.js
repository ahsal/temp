// const { response } = require("express");

function setup() {

let lat, lng;





    
    // console.log(json);


if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        try {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lng;

    // const api_url = `api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=5&appid=${id}`;
    const api_url = `/w/${lat},${lng}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
    console.log(json.list[0].main);
    console.log(json.list[0].weather[0].main);
    const weather = json.weather.list[0].weather[0].description;
    const temp = json.weather.list[0].main.temp;
    const aq = json.air_quality.results[0].measurements[0];
    console.log(aq);
    document.getElementById('weather').textContent = weather;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('particle').textContent = aq.parameter;
    document.getElementById('units').textContent = aq.unit;
    document.getElementById('value').textContent = aq.value;
    document.getElementById('date').textContent = aq.lastUpdated;
    console.log(data);

    const data = { lat, lng, weather, temp, aq};
    const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
    };
    fetch('/api', options);
    console.log('stuff sent')
    console.log(data);
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json)
        }catch(error){
            console.log('data smells fishy!');

        }
    });
} else {
    console.log('geolocation not available');
}


}
