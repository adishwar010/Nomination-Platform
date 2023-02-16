const AWS = require("aws-sdk");
const config = require("config");
const fs = require("fs");
const generateUniqueId = require("generate-unique-id");

const BUCKET_NAME = config.get("AwsS3BucketName");
const s3 = new AWS.S3({
  accessKeyId: config.get("amazonKeyId"),
  secretAccessKey: config.get("amazonSecretKey"),
});

const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    // Setting up S3 upload parameters
    console.log("aws file", file);
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${generateUniqueId({ length: 5 })}.jpg`, // File name you want to save as in S3
      Body: file.buffer,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      resolve(data.Location);
    });
  });
};

module.exports = uploadFile;
