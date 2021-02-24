const axios = require('axios');
const { expect } = require('chai');

describe ('Test the forecast for a given location on the DarkSky API', function () {

    let apiKey = '67d6aac020fb58bdbd635673bac38b2f';
    let latitude = 37.423021;
    let longitude = -122.083739;
    let res;

    it ('Sample_DarkSky: Convert address into geographic coordinates. Status code is 200', function () {
        return axios({
            method: 'GET',
            url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`,
        })
            .then(response=> {
                console.log(response.data)
                res = response.data;
            })
        expect(response.status).eq(200);

    })

    it (' Latitude value is correct', function(){
        expect(res.latitude).eq(latitude);
    })

    it (' Longitude  value is correct', function(){
        expect(res.longitude).eq(longitude);
    })

    it ('Data types for ‘currently’ object property are valid', function(){
        let obj = res.currently;
        console.log(obj);
        expect(obj.time).an('number');
        expect(obj.summary).an('string');
        expect(obj.icon).an('string');
        expect(obj.nearestStormDistance).an('number');
        expect(obj.nearestStormBearing).an('number');
        expect(obj.precipIntensity).an('number');
        expect(obj.precipProbability).an('number');
        expect(obj.dewPoint).an('number');
        expect(obj.humidity).an('number');
        expect(obj.pressure).an('number');
        expect(obj.windSpeed).an('number');
        expect(obj.windGust).an('number');
        expect(obj.windBearing).an('number');
        expect(obj.cloudCover).an('number');
        expect(obj.uvIndex).an('number');
        expect(obj.visibility).an('number');
        expect(obj.ozone).an('number');

        // let strings = 0;
        // let numbers = 0;
        // let arr = [];
        // function typesOfData (obj) {
        //     for (let key in obj) {
        //         if (typeof obj[key] === 'string') strings++;
        //         if (typeof obj[key] === 'number') numbers++;
        //     }
        //     arr.push(strings,numbers)
        //     return arr;
        // }
         //expect(arr[0]).eq(2);
         //expect(arr[1]).eq(17);

        // function arr (obj) {
        //     let array = []
        //     for (let key in obj){
        //         array.push(obj[key])
        //     }
        //     return array
        // }
        // console.log(arr(obj));

    })

    let apiKey_g = 'AIzaSyA_a8j2X18QEpfvHA9uTBDYKdsrbWkt1yA';
    let address = '1600 Amphitheatre Parkway,Mountain View,CA,USA';
    function encodeAddress (address) {
        address = address.replace(/[' ',]/g,'%20');
        return address;
    }
    let lat;
    let lng;

    it ('GoogleAPI: Convert address into geographic coordinates', function () {
        return axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}?&key=${apiKey_g}`,
        })
            .then(response=> {
                console.log(response.data);
                lat = response.data.results[0].geometry.location.lat;
                lng = response.data.results[0].geometry.location.lng;
                //expect(response.status).eq(200)
                expect(lat).eq(37.4222934);
                expect(lng).eq(-122.0841409);
            })
    })

})
