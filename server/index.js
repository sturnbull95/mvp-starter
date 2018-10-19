var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var favorites = require('../database-mysql');
const morgan = require('morgan');

// var items = require('../database-mongo');

var app = express();
const port = 3000;
const router = require('./routes');
const path = require('path')

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../react-client/dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',router)
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// app.get('/favorites', function (req, res) {
//   favorites.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(port, function() {
  console.log('listening on port 3000!');
});
