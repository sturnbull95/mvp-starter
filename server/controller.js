const db = require('../database-mongo/index.js');
const controller = {
  get: (req,res) => {
    db.Favorites.find({}).then(data => res.status(200).send(data))
  },
  post: (req,res) => {
    const {name,img} = req.body
    db.Favorites.create({name,img},function(err,data){
      if(err){
        console.log(err)
      } else{
        res.status(201).send(data)
      }
    });
  },
  delete: (req,res) => {
    console.log(req.body)
    const img = req.body.data;
    db.Favorites.remove({
      img
    }).then(data => res.status(203).send('deleted')).catch(err => console.error(err))
  },
  type: (req,res) => {
    res.send(req.body)
    console.log(req.body)
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
