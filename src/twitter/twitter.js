const Twitter = require('twitter');
const secrets = require('../../../secrets');

module.exports = function tweetFusion(fusionData, imgData){
    const client = new Twitter(secrets);
    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', {media: imgData}, function(error, media, response) {
        
    if (!error) {
        var status = {
        status: `${fusionData.mom} + ${fusionData.dad} = ${fusionData.name}`,
        media_ids: media.media_id_string, // Pass the media id string
        }

        client.post('statuses/update', status, function(error, tweet, response) {
            if (error) console.log(error);
        });

    } else {
        console.log(error);
    }
    });
}