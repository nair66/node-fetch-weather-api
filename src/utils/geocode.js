const request = require('request')

const geocode = (addr,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json/?access_token=${process.env.MAPBOX_API_KEY}&limit=1`


    request.get({
        url,
        json:true
    },(err,res,body) => {
        if(err){
            callback('Unable to connect to location service',undefined)
        }
        else if(body.message){
            callback('Invalid location',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }
        else{
            const latitude =  body.features[0].geometry.coordinates[1]
            const longitude = body.features[0].geometry.coordinates[0]
            const location = body.features[0].place_name
            // console.log(coordinates_lat,coordinates_long)
            callback(undefined,{
                latitude,
                longitude,
                location
            })
        }
        
    })
}

module.exports = geocode