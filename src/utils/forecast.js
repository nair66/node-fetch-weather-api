const request = require('request')



const forecast = (latitude,longitude,callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${latitude},${longitude}`
    request({
        url,
        json:true
    },(err,res,body) => {
        if(err){
            callback('Unable to connect with weather service',undefined)
        }
        else if(body.error){
            callback('Invalid location',undefined)
        }
        else{
            const summary = body.currently.summary
            const temperature = body.currently.temperature
            const precipPossibility = body.currently.precipProbability
            const precipType = body.currently.precipType || 'Rain'
            callback(undefined,{summary,temperature,precipPossibility,precipType})
        }
    })
}

module.exports = forecast