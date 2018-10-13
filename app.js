var express = require('express');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors')
var path = require('path')
var pollRoute = require('./routes/poll')
var model = require('./models/vote')

var app = express()

var port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/poll', pollRoute)



app.use((req,res,next)=>{
  let err = new Error('not found');//err.message
  err.status = 404
  next(err)
})

app.use((err,req,res,next)=>{
  res.status(err.status).send(err.message)
//res.sendStatus(404)
})

app.listen(port, ()=>console.log(`listening on port ${port}`))
