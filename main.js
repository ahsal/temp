// IMPORTING LIBS

const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const database = new Datastore('database.db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to${port}` ));
app.use(express.static('public'));
app.use(express.json());

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
});

app.post('/api', (request, response) => {
    const data = request.body;
    try {
        database.insert(data);
      }
      catch(err) {
        console.log('shit gone wrong');
      }
});


app.get('/w/:latlng', async (request, response) =>{


    const latlng = request.params.latlng.split(',');

    const lat = latlng[0];
    const lng = latlng[1];
    const id = process.env.API_KEY;
    const weather_url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=1&appid=${id}`;



    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const aqurl = `https://docs.openaq.org/v2/latest?coordinates=${lat}%2C${lng}`;
    const aq_response = await fetch(aqurl);
    const aq_data = await aq_response.json();


    const data = {
        weather: weather_data,
        air_quality: aq_data
      }
    response.json(data);
    console.log(data.aq);
});

console.log('good work');
