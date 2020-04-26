const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  owner: String,
  url: String,
  description: String
});

let Repo = mongoose.model('Repo', repoSchema);

let search = (callback) => {
  Repo.find({}, (err, res) => {
    if (err) {
      console.log('failed find', err);
    } else {
      // console.log('found!', res);
      var sorted = res.sort((a, b) => {return a.id - b.id; });
      var result = sorted.slice(0, 25);
       callback(null, result);
    }
  });
}

let save = (repos) => {
  console.log('REPOS', repos.length);
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (var i = 0; i < repos.length; i++){
    var current = repos[i];
    Repo.find({id: repos[i].id}, (err, res) => {
      console.log('ran');
      if (err) {
        console.log("ERROR at save", err);
      } else {
        // console.log('RES', res);
        if (res.length === 0) {
          var tempRepo = new Repo({
            id: current.id,
            name: current.name,
            owner: current.owner.login,
            url: current.url,
            description: current.description
          })
          tempRepo.save((err, tempRepo) => {
            if (err) {
              console.log(err);
            } else {
              console.log('saved repo!');
            }
          })
        } else {
          console.log('not saved, duplicate');
        }
      }
    })
  }

}

module.exports.save = save;
module.exports.search = search;

// Repo.find({id: repo.id}, (err, res) => {
//   if(err) {
//     console.log("ERROR", err);
//   } else {
//     if (res.length === 0) {
//       var tempRepo = new Repo({
//         id: repo.id,
//         name: repo.name,
//         owner: repo.owner.login,
//         url: repo.url,
//         description: repo.description
//       })
//       tempRepo.save((err, tempRepo) => {
//         if (err) {
//           console.log("ERROR", err)
//         } else {
//           console.log('saved repo!')
//         }
//       })
//     } else {
//       console.log('not saved, duplicate!')
//     }
//   }
// })