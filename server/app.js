const express = require('express')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const passport = require("passport")
const index = require('./routes/index')
const services = require('./routes/ServicesRoutes')
const serviceDetails = require('./routes/ServiceDetailsRoutes')
const orders = require('./routes/OrdersRoutes')
const auth = require('./routes/AuthRoutes')
const users = require('./routes/users')
const address = require('./routes/AddressRoutes')
const profiles = require('./routes/ProfileRoutes')

require('dotenv').load()

const app = express()

require('./config/passport')(passport)
require('./config/express')(app)
require('./config/cors')(app)

app.use('/', index)
app.use('/', auth)
app.use('/users', users)
app.use('/services', services)
app.use('/service-details', serviceDetails)
app.use('/orders', orders)
app.use('/addresses', address)
app.use('/profiles', profiles)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
