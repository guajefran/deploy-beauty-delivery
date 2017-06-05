const mongoose = require('mongoose')
let Service = require('../models/ServiceModel.js')
const servicesData = require('./data/services.js')

mongoose.connect('mongodb://localhost/beauty-delivery')

Service.collection.drop()

servicesData.forEach( category => {
  let categoryName = category.name;
  category.services.forEach( service => {
    Service.create({
      name: service.name,
      category: categoryName
    })
      .catch(panic => { console.log(panic)})
      .then(()=> {console.log('Categories created!')})
  })
})

mongoose.connection.close()
