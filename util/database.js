const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://vasil:Awesome123@cluster0.8kvabr7.mongodb.net/?retryWrites=true&w=majority')
        .then((result) => {
            callback(result)
            console.log('connected')
        })
        .catch((err) => console.log(err))
}

module.exports = mongoConnect
