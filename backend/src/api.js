const keys = require('../config.json');
const axios = require('axios');
const ts = new Date().getTime();
const md5Hex = require('md5-hex');
let hash = md5Hex(ts + keys.private_key + keys.publick_key);
var url = "http://gateway.marvel.com/v1/public/comics?limit=10" + "&ts=" + ts + "&apikey=" + keys.publick_key + "&hash=" + hash;

const params = {
    offset: 0,
    limit: 10,
    ts: ts,
    apikey: keys.publick_key,
    hash: hash
}

module.exports = {
    ListComics(request, response) {
        var baseUrl = "http://gateway.marvel.com/v1/public/comics";
        const { page = 1 } = request.query;
        params.offset = 10 * (page - 1);
        axios.get(baseUrl, {
            params: params,
            headers: {
                'Access-Control-Allow-Origin': true,
              },
        }).then(resp => {
            return (response.json(resp.data.data));
        })
        .catch(error => {
            console.log(error);
        })
    },

    ComicInfos(request, response) {
        const { comicId } = request.params;
        var baseUrl = "http://gateway.marvel.com/v1/public/comics/" + comicId;
        axios.get(baseUrl, {
            params: params
        }).then(resp => {
            return response.json(resp.data.data.results)
        }) 
        .catch(error => {
            console.log(error);
        })
    }
}
