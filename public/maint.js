

if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
    
        let lat, lng, weather, aq, temp;
        try{
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lng;

        const api_url = `/w/${lat},${lng}`;
        const response = await fetch(api_url);
        const json = await response.json();
        // console.log(json);


         weather = json.weather.list[0].weather[0].description;
         temp = json.weather.list[0].main.temp;
         aq = json.air_quality.results[0].measurements[0]; 

        // console.log(aq);
        document.getElementById('weather').textContent = weather;
        document.getElementById('temperature').textContent = temp;
        document.getElementById('particle').textContent = aq.parameter;
        document.getElementById('units').textContent = aq.unit;
        document.getElementById('value').textContent = aq.value;
        document.getElementById('date').textContent = aq.lastUpdated;

        


    }catch (error){

        document.getElementById('value').textContent = 'NO READ';
        const data = { lat, lng, weather, temp, aq};

    }

    const data = { lat, lng, weather, temp, aq};
    console.log(data);
        const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}        
        };

        const db_response = await fetch('/api', options);
        const db_json = await db_response.json();


    console.log('stuff sent');


        }     
)}
else {
    console.log('geolocation not available');
}
    