var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var Save = require('../database-mongo/index.js');
const morgan = require('morgan');
const helpers = require('../helpers/fetchDogs.js')

var app = express();
const port = 3000;
const router = require('./routes');
const path = require('path')

// UNCOMMENT FOR REACT
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../react-client/dist')));

app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',router)

app.listen(port, function() {
  console.log('listening on port 3000!');
});
