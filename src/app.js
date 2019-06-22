const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weatherforecast = require('./forecast')
const geocode = require('./geodata')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath )
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michael'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Real Help',
        name: 'Michael',
        message: 'get your help here'
    })
})

app.get('/about', (req,res) => {
    res.render ('about', {
        title: 'About',
        name: 'Michael'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({error:  'You must provide an address!'})
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (!error) {
            //const geo = geodata.body
            weatherforecast(latitude, longitude, (error, weatherdata = {})=> {
                if (error) {
                    return res.send({error:'Error while retrieving the weatherforcast'})
                } else {
                    return res.send({
                        location: location,
                        forecast: 'It is currently ' + weatherdata.temperature + ' degrees out. There is a ' + weatherdata.precipProbability + ' % chance of rain.',
                        temperature: weatherdata.temperature,
                        address: req.query.address
                    })
                }
                                
            })
            //latleng = {lat: geo.features[0].center[1], len: geo.features[0].center[0]}
        } else {
            return res.send({error: error})
            //console.log(error)
        }
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404.hbs', {
        message: 'help page not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404.hbs', {
        message: 'page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 