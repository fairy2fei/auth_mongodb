// import dependencies
const express = require('express')
const config = require('./config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
// const cors = require('cors')
// const morgan = require('morgan')
const app = express() // create your express app
const router = express.Router();
// make app use dependencies
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// CORS middleware
const enableCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
}

app.use(enableCrossDomain)

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = "mongodb+srv://fairy2fei:912913Zf@fairy2fei-xbavj.gcp.mongodb.net/test?retryWrites=true"


var mongoClient = new MongoClient(uri, { reconnectTries : Number.MAX_VALUE, autoReconnect : true, useNewUrlParser : true }) // allows for connection to the db

mongoClient.connect((err, db) => { // returns a connection to the mongodb
  if (err != null) {
    console.log(err)
    return
  }
  client = db
})


// app.use(morgan('dev'))
// app.use(bodyParser.json())
// app.use(cors())

router.post('/register', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const collection = client.db('test').collection('users')
  var thisuser = req.body // parse the data from the request's body
  collection.find({username: thisuser.username}).toArray(function (err, results) {
    if (results.length == 0){
      collection.insertOne({username: thisuser.username, password:  bcrypt.hashSync(thisuser.password, 8)}, function (err, results) {
        if (err) return res.status(500).send({data : "There was a problem registering the user."})
        collection.find({username: thisuser.username}).toArray(function (err, results) {
          user = results[0];
          if (err) return res.status(500).send({data :"There was a problem getting user"})
          let token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ data : "Register successful.", auth: true, token: token, user: user });
        });
      });
    }else{
      return res.status(500).send({ data : "User already existed"});
    }
 })
});

router.post('/login', (req, res) => {
  const collection = client.db('test').collection('users')
  var thisuser = req.body
  collection.find({username: thisuser.username}).toArray(function (err, results) {
      user = results[0];
      if (err) return res.status(500).send({data :'Error on the server.'});
      if (!user) return res.status(404).send({data :"No user found."});
      let passwordIsValid = bcrypt.compareSync(thisuser.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ data :'Your password is not correct.', auth: false, token: null });
      let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ data : "Login successful.", auth: true, token: token, user: user });
  });
})
app.use(router)

let port = process.env.PORT || 8081;// client is already running on 8080

let server = app.listen(port, function () {
    console.log('Server listening on port ' + port)
});
