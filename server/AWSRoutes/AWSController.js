var aws = require('aws-sdk');
var awsConfig = require('../../../aws.config.js');

var getUrl = function(req, res) {
  //return the URL
  aws.config.update({accessKeyId: awsConfig.AWS_ACCESS_KEY, secretAccessKey: awsConfig.AWS_SECRET_KEY});
    var s3 = new aws.S3()
    var options = {
      Bucket: awsConfig.S3_BUCKET,
      Key: req.query.file_name,
      Expires: 60, 
      ContentType: req.query.file_type,
      ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', options, function(err, data){
      if(err) return res.send('Error with S3')

      res.json({
        signed_request: data,
        url: 'https://s3.amazonaws.com/' + awsConfig.S3_BUCKET + '/' + req.query.file_name
      })
    })
};


module.exports = {
  getUrl: getUrl
};

