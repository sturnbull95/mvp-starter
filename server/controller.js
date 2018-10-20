const db = require('../database-mongo/index.js');
const controller = {
  get: (req,res) => {
    db.Favorites.find({}).then(data => res.status(200).send(data))
  },
  post: (req,res) => {
    const {name,img} = req.body
    console.log('MEH',name,img)
    db.Favorites.create({name,img},function(err,data){
      if(err){
        console.log(err)
      } else{
        res.status(201).send(data)
      }
    });
  },
  delete: (req,res) => {
    console.log(req)
    const {name} = req.body;
    db.Favorites.destroy({
      where: {name}
    }).then(data => res.status(203).send('deleted')).catch(err => console.error(err))
  },
  put: (req,res) => {
    const {name, newName} = req.body;
    Favorites.update({name,newName},{where:{name}})
    .then(data => {res.status(202).send('updated')})
    .catch(err => console.error(err))
  }
}
module.exports = controller;
