const mongoose = require('./db');

const Schema = mongoose.Schema;
const voteSchema = new Schema({
  os: {
    type: String,
    required: true
  },
  points: {
    type : String,
    required: true
  }
})


const Vote = mongoose.model('vote', voteSchema)

module.exports = Vote
