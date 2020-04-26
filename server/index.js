const express = require('express');
const save = require('../database/index.js').save;
const search = require('../database/index.js').search;
const gitHub = require('../helpers/github.js').getReposByUsername;

let app = express();
let bodyParser = require('body-parser')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log(req.body);
  var user = req.body.user;
  console.log('USER', req.body.user);
  gitHub(user, (e,r) => {
    // console.log(r);
    if (e) {
      console.log('ERROR at post', e);
    } else {
      save(r)
      res.status(200).send('SUCCESS!');
    }
  })
  // console.log(user);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  search((err, result) => {
    res.send(result)
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

