import { Buffer } from "buffer";

const imageUpload = async (
  inputBase64Data: any,
  inputFileType: any,
  inputFileName: any,
  parentPath: string = "etc"
): Promise<any> => {
  const AWS = require("aws-sdk");

  AWS.config.setPromisesDependency(require("bluebird"));
  AWS.config.update({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.S3_REGION,
  });

  // Create an s3 instance
  const s3 = new AWS.S3();

  let replaceBase64Data: any = inputBase64Data.replace(
    inputBase64Data.split("base64,")[0] + "base64,",
    ""
  );
  replaceBase64Data = new (Buffer.from as any)(replaceBase64Data, "base64");
  const type = inputFileType.split("/")[1];

  const nowTime = Math.round(new Date().getTime() * 0.001);

  //const filePath = `cocoda-file/${nowTime}/${inputFileName}.${type}`
  // const filePath = `${parentPath}/${nowTime}/${inputFileName}`;
  const filePath = `${parentPath}/${nowTime}_${inputFileName}`;
  const params = {
    Key: filePath, // type is not required
    Bucket: process.env.S3_BUCKET,
    Body: replaceBase64Data,
    ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: inputFileType, // required. Notice the back ticks
  };
  let location = filePath;
  let key = "";
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error);
    return null;
  }
  return key;
};

const S3ToongaStorage = {
  imageUpload: imageUpload,
};

export default S3ToongaStorage;
