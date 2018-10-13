const router = require('express').Router();
var path = require('path')
var Pusher = require('pusher');
const config = require('../config').development
const Vote = require('../models/vote');
var pusher = new Pusher({
  appId: '620714',
  key: config.key,
  secret: config.secret,
  cluster: 'eu',
  encrypted: true
});

router.get('/', (req,res)=>{
  Vote.find().then((votes)=>res.json({success: true, votes: votes}))
    //res.sendFile(path.join(__dirname,'../views/index.html'))
})

router.post('/', (req,res)=>{
    const newVote = {
      os: req.body.os,
      points: 1
    }
    new Vote(newVote).save().then((vote)=>{
        pusher.trigger('os-poll', 'os-vote', {
          points: parseInt(vote.points),
          os: vote.os
        });
        //console.log(req.body)
        return res.json({success: true, message: 'successfully added'})
    })
})

module.exports = router
