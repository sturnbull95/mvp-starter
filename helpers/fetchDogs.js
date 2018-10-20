const request = require('request');
const config = require('../config.js');
const db = require('../database-mongo');

let getDogsByBreed = (breed, callback) => {

  let options = {
    url: `https://dog.ceo/api/breed/${breed}/images`,
    headers: {
      'User-Agent': 'request',
      'key': `token ${config.API_KEY}`
    }
  };

  request.get(options, function(err, githubObject) {
    if (err) {
      console.error(err, null);
    } else {
      callback(githubObject);
    }
  });

}

module.exports.getDogsByBreed = getDogsByBreed;