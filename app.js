require('dotenv').config()

const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')

const errorController = require('./controllers/error')
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }))

app.use((req, res, next) => {
    User.findById('63d3cdfea6673f35c077df57')
        .then((user) => {
            req.user = user
            next()
        })
        .catch((err) => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.get404)

mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: 'Vasilis',
                    email: 'test@email.com',
                    cart: {
                        items: [],
                    },
                })
                user.save()
            }
        })

        app.listen(3000)
    })
    .catch((error) => console.log(error))
