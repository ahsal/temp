const mymap = L.map('mymap').setView([0,0], 2);
const attribution = '&copy; <a herf="heeps://www.openstreetmap.org/copyright">OpenStreatMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(mymap);





getData()
async function getData() {

    const response = await fetch('/api');
    const data = await response.json();


for ( item of data){
    console.log(item);
    const marker = L.marker([item.lat, item.lng]).addTo(mymap);

    let txt = `The weather here at ${item.lat}&deg;,
    ${item.lng}&deg; is ${item.weather} with a temperature of ${item.temp}&deg;F.`
 
// console.log(item.aq.value);
    if (!('aq' in item)){
        txt+= 'no air quality values'
    }
    else{
        txt += `The concentration of particulate matter (${item.aq.parameter}) is ${item.aq.value} ${item.aq.unit} last read on ${item.aq.lastUpdated}`
    }
 


    marker.bindPopup(txt);
}
//     const root = document.createElement('p');
//     const geo = document.createElement('p');



    // const date = document.createElement('div');

    // console.log(item);
    // geo.textContent = `${item.lat}, ${item.lng}`;
    //  const datestring = new Date(item.timestamp).toLocaleString();
    //  date.textContent = datestring;
    
    // root.append(geo);
    // document.body.append(root);

// }
console.log(data)
}

