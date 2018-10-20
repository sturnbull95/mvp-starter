var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var Save = require('../database-mongo/index.js');
const morgan = require('morgan');
const helpers = require('../helpers/fetchDogs.js')

// var items = require('../database-mongo');

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
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
app.post('/types',function(req,res){
  helpers.getTypes(function(obj){
    //console.log('ART',JSON.parse(obj.body).message)
    res.send(JSON.parse(obj.body).message)
  })
})
app.post('/favorites', function(req,res){
  //console.log('Ahhhhh',req.body)
  helpers.getDogsByBreed(req.body.data,function(obj){
    //console.log('OHMYGOD',obj)
    for(var i = 0; i < JSON.parse(obj.body).message.length; i++){
      var temp = new Save.Favorites({img:JSON.parse(obj.body).message[i]})
      temp.save(function(err){
        if(err){
          console.log(err)
        }
      })
    }
  })
})

// app.post('/api/favorites', function(req,res){
//   console.log(req.body)
//   // helpers.getDogsByBreed(req.body.data,function(obj){
//   //   console.log(obj,req.body)
//   //   res.send(obj)
//   // })
// })
// app.post('/spec/favorites', function(req,res){
//   console.log(req.body)
//
// })
app.get('/favorites', function (req, res) {
  Save.Favorites.find(function(err,dogs){
    if(err){
      console.log(err)
    } else{
      res.send(dogs)
    }
  })
});

app.listen(port, function() {
  console.log('listening on port 3000!');
});
