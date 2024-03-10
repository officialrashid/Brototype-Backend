import { PutObjectCommand, S3Client ,ListObjectsV2Command,GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { v4 as uuid } from "uuid";

const s3 = new S3Client({
  region:"ap-south-1",
  credentials: {
    accessKeyId: "AKIA2PZTHJKAKZ7SZDUZ",
    secretAccessKey: "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",
  },
});
const BUCKET = "brototype-reviewers-profile"
if (!BUCKET) {
  throw new Error("BUCKET environment variable is not defined.");
}
interface ProfileUpdate {
  file: {
    buffer: Buffer;
    mimetype: string;
  };
  superleadId: string;
  imageUrl?: string; // Make imageUrl optional
}

export const uploadToS3 = async ({ file, superleadId }: ProfileUpdate): Promise<ProfileUpdate> => {
  const key = `${superleadId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  });

  try {
    const response = await s3.send(command);

    const url: string = `https://s3.ap-south-1.amazonaws.com/${BUCKET}/${key}`;
    console.log(url, "url coming s3");

    return { file, superleadId, imageUrl: url };
  } catch (err) {
    console.error(err,"pppppppppppppp");
    return { file, superleadId, imageUrl: undefined }; 
  }
  
};



