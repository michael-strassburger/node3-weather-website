request = require('request')

const geocode = (location, callback = {} ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent( location )  + '.json?access_token=pk.eyJ1Ijoid2lnb21pa2UiLCJhIjoiY2p0cHdlazlnMDhhMTQzbGw5NXQ5b2VsdyJ9.gjy9DkgXDgq830zIU20b3Q&limit=1'
    request({url, json: true}, (error, { body } = {} ) => {
        if (error) {
            callback('Cannot get connection to location info!', undefined)
        } else if (body.features.length === 0) {
            callback('Cannot get location info!', undefined)
        } else {
            const geo = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, geo)
            //callback(undefined, body)
        }
    })
}

module.exports = geocode
