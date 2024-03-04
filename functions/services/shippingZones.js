const firebaseService = require('./firebase')
const admin = firebaseService.admin

// let zones = {
//      zone1: {
//         countries: ['US'], // array of country codes, capitalized
//         weightsLb: [ // from, to, price in USD
//             [0, 0.01, 0],
//             [0.02, 2.00, 4.95],
//             [2.01, 4.00, 6.95],
//             [4.01, 6.00, 8.95],
//             [6.01, 10.00, 10.95],
//             [10.01, 99999, 11.95]
//         ]
//     }
// }

let setupShippingZones = async (uid) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
        let _zones = await db.ref('/shippingZones/default').once('value')
        let zones = _zones.val()

        await db.ref('/shippingZones/' + (uid || 'f')).set(zones)
        return resolve('ok')
    })
}

let shippingZones = async (productId) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
        let _product = await db.ref('/publicProducts/' + (productId || 'f')).once('value')
        let product = _product.val()
        let ownerId = product.ownerId
        let _zones = await db.ref('/shippingZones/' + (ownerId || 'f')).once('value')
        let zones = _zones.val()
        return resolve(zones)
    })
}

let shippingZonesByOwner = async (ownerId) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
        let _zones = await db.ref('/shippingZones/' + (ownerId || 'f')).once('value')
        let zones = _zones.val()
        return resolve(zones)
    })
}

let getShippingRate = async (productId, countryCode, orderWeightLb) => {
    return new Promise(async (resolve, reject) => {
        let zones = await shippingZones(productId)
        for (let z in zones) {
            let zone = zones[z]
            if (zone.countries.indexOf(countryCode) > -1) {
                let weights = zone.weightsLb
                for (let w in weights) {
                    let weight = weights[w]
                    let from = weight[0]
                    let to = weight[1]
                    let price = weight[2]
                    if ((orderWeightLb >= from) && (orderWeightLb <= to)) {
                        return resolve(price)
                    }
                }
            }
        }
        return resolve('NA')
    })
}

let getShippingRateForOrder = async (ownerId, countryCode, totalWeight) => {
    return new Promise(async (resolve, reject) => {
        // return resolve(13.36)
        let zones = await shippingZonesByOwner(ownerId)
        console.log('getShippingRateForOrder', ownerId, countryCode, totalWeight)
        for (let z in zones) {
            let zone = zones[z]
            console.log('zone', zone)
            if (zone.countries && zone.countries.indexOf(countryCode) > -1) {
                let weights = zone.weightsLb
                console.log(countryCode, 'weights', weights)
                for (let w in weights) {
                    let weight = weights[w]
                    let from = weight[0]
                    let to = weight[1]
                    let price = weight[2]
                    if ((totalWeight >= from) && (totalWeight <= to)) {
                        console.log('SUCCESS', price)
                        return resolve(price)
                    }
                }
            }
        }
        return resolve('NA')
    })
}

exports.shippingZones = shippingZones
exports.getShippingRate = getShippingRate
exports.getShippingRateForOrder = getShippingRateForOrder
exports.setupShippingZones = setupShippingZones