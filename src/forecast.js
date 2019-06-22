request = require('request')

const weatherforecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/43e64c3d5e7f102111366b2daf508de5/' + latitude + ',' + longitude + '?units=si'
    console.log(url)
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot get weather information!', undefined)
        } else if (body.code) {
            callback('Error: ' + body.code, undefined)
        } else {
            callback(undefined, body.currently)
        }
    }) 
}

module.exports = weatherforecast
