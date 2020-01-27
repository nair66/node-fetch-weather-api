const request = require('request')
const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const publicDirectoryPath = path.join(__dirname,'../public')

const app = express()
app.use(express.static(publicDirectoryPath))
const PORT = process.env.PORT || 3000


app.get('/weather',(req,res) => {
    geocode(req.query.addr,(err,{latitude,longitude,location} ={}) => {
        if(err){
           return res.status(500).send({err}) 
        }
        // console.log('Lat: ',res.latitude,'Long: ',res.longitude)
        //fire off call to dark sky api here
        forecast(latitude,longitude,(err,weatherInfo) => {
            if(err){
                res.status(500).send({err})
            }
            weatherInfo['location'] = location
            res.send(weatherInfo)

        })
    })
})

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})