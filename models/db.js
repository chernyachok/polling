const mongoose = require('mongoose');
const config = require('../config').mongodb

mongoose.Promise = global.Promise

mongoose.connect(config.key)
  .then(()=>console.log('connected'))
    .catch((err)=> console.log(err))



module.exports = mongoose
