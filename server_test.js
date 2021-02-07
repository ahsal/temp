
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
app.listen(8080, () => console.log('listening at 8080'));
app.use(express.static('public'));
app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();
app.get('/api', (request, response) => {
  database.find({}, (err, data)=> {

    if(err){
        console.log('error!!!');
        response.end();
        return 
    }
    response.json(data);

});
})

app.post('/api', (request, response) => {
    const data = request.body;
    console.log(data);
    // request.json(data);

    // database.find({}, (err, data)=> {
    //     if(err){
    //         console.log('error!!!');
    //         response.quit();
    //         return 
    //     }
        
    // });
    
    try {
        database.insert();        
      }
      catch(err) {
        console.log('shit gone wrong');
      }
    //  response.json(data);
})

app.get('/w/:latlng', async (request, response) =>{
  console.log(request.params)
  const latlng = request.params.latlng.split(',');
  console.log(latlng);
  const lat = latlng[0];
  const lng = latlng[1];
  const id = '8e13741855432b0505ed483baa48e378';
  const weather_url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=1&appid=${id}`;
  

  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();


  const aqurl = `https://docs.openaq.org/v2/latest?coordinates=${lat}%2C${lng}`;
  const aq_response = await fetch(aqurl);
  const aq_data = await aq_response.json()

    const data = {
      weather: weather_data,
      air_quality: aq_data
    }
response.json(data);
});





console.log('good work');

// https://docs.openaq.org/v2/latest