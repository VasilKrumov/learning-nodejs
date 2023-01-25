const Sequelize = require('sequelize')

let _db

const mongoConnect = (callback) => {
    MongoClient.connect(`${process.env.MONGO_URL}`)
        .then((client) => {
            callback(client)
            _db = client.db()
        })
        .catch((err) => {
            console.log(err)
            throw err
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
