const db = require('../database-mongo/index.js');
const helpers = require('../helpers/fetchDogs.js')
var Save = require('../database-mongo/index.js');
const controller = {
  get: (req,res) => {
    Save.Favorites.find(function(err,dogs){
      if(err){
        console.log(err)
      } else{
        res.send(dogs)
      }
    })
  },
  post: (req,res) => {
    const name = req.body.data
    console.log(name)
    helpers.getDogsByBreed(name,function(obj){
      //console.log('OHMYGOD',obj)
      for(var i = 0; i < JSON.parse(obj.body).message.length; i++){
        var temp = new Save.Favorites({img:JSON.parse(obj.body).message[i]})
        temp.save(function(err,data){
          if(err){
            console.log(err)
          }
        })
      }
      console.log(obj)
      res.status(201).send(obj)
    })
  },
  delete: (req,res) => {
    const img = req.body.data;
    db.Favorites.remove({
      img
    }).then(data => res.status(203).send('deleted')).catch(err => console.error(err))
  },
  type: (req,res) => {
    helpers.getTypes(function(obj){
      //console.log('ART',JSON.parse(obj.body).message)
      res.send(JSON.parse(obj.body).message)
    })
  }

  // ,
  // put: (req,res) => {
  //   const {name, newName} = req.body;
  //   Favorites.update({name,newName},{where:{name}})
  //   .then(data => {res.status(202).send('updated')})
  //   .catch(err => console.error(err))
  // }
}
module.exports = controller;
