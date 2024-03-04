require('dotenv').config()
const Unsplash = require('unsplash-js');
const nodeFetch = require('node-fetch');
const unsplash = Unsplash.createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch
});

let getRandomPhotos = async () => {
    return new Promise(async (resolve, reject) => {
        let photos = await unsplash.photos.getRandom(

            { count: 15 },
            // `fetch` options to be sent only with _this_ request
            { headers: { 'X-Custom-Header-2': 'bar' } },
        )
        return resolve(photos)
    })
}

let getPhotosBy = async (query, page) => {
    return new Promise(async (resolve, reject) => {
        let photos = await unsplash.search.getPhotos(
            { 
                query,
                count: 15,
                page: page || 1
            },
            // `fetch` options to be sent only with _this_ request
            { headers: { 'X-Custom-Header-2': 'bar' } },
        )
        return resolve(photos)
    })
}

exports.unsplash = unsplash
exports.getRandomPhotos = getRandomPhotos
exports.getPhotosBy = getPhotosBy