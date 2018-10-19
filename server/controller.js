const {Favorites} = require('../database-mysql/model');
const controller = {
  get: (req,res) => {
    Favorites.findAll({})
    .then(data => res.status(200).send(data))
    .catch(err => console.error(err))
  },
  post: (req,res) => {
    const {name,img} = req.body
    Favorites.create({name,img})
    .then(data => {res.status(201).send(data)})
    .catch(err => console.error(err))
  },
  delete: (req,res) => {
    console.log(req)
    const {name} = req.body;
    Favorites.destroy({
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
