var mysql = require('mysql');
const Sequelize = require('sequelize');

var connection = new Sequelize('dogs','student','student',{
  host     : 'localhost',
  dialect  : 'mysql'
});

// var selectAll = function(callback) {
//   connection.query('SELECT * FROM dogs', function(err, results, fields) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };
connection.authenticate().then(() => console.log('connected to mysql')).catch(err => console.error(err))
module.exports = connection;
//module.exports.selectAll = selectAll;
