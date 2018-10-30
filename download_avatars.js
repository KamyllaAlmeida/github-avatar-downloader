var myArgs = process.argv.slice(2);



const secret = require('./secrets');
const secretKey = secret.GITHUB_TOKEN;

var request = require('request');

//console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secretKey
    }
  };



  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
  console.log("Errors:", err);
  //console.log("Result:", result);
  let jsonObject = JSON.parse(result);

  console.log(jsonObject);

  for(var i in jsonObject){
    downloadImageByURL(jsonObject[i].avatar_url, "avatars/" + i + ".jpg")
    //console.log(jsonObject[i].avatar_url);
  }

});

function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');

  request.get(url)               // Note 1
         .on('error', (err) => {                                   // Note 2
           throw err;
         })

         //.on('pipe', () => {
          //console.log('Downloading image...');
         //})
         .pipe(fs.createWriteStream(filePath))

         .on('finish', () => {
            console.log('Download complete.');
          });
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")