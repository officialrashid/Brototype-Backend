import { PutObjectCommand, S3Client ,ListObjectsV2Command,GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { v4 as uuid } from "uuid";
interface UserPresignedUrlsResponse {
  err?: any;
  signedUrls?: any;
}
const s3 = new S3Client({
  region:"ap-south-1",
  credentials: {
    accessKeyId: "AKIA2PZTHJKAG3NEKEN7",
    secretAccessKey: "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",
  },
});
const BUCKET = "brototype-students-profile"
if (!BUCKET) {
  throw new Error("BUCKET environment variable is not defined.");
}
interface ProfileUpdate {
  file: {
    buffer: Buffer;
    mimetype: string;
  };
  studentId: string;
}

export const uploadToS3 = async ({ file, studentId }: ProfileUpdate): Promise<{ key?: string; err?: any }> => {
  const key = `${studentId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  });

  try {
      const response = await s3.send(command);
    return { key : response.ETag };
  } catch (err) {
    console.error(err);
    return { err };
  }
  
};
const getImageKeysByUser = async (studentId:any) =>{
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix:studentId
  })

const {Contents = []} = await s3.send(command)
return Contents.map(image => image.Key)
} 
export const getUserPresignedUrls = async (studentId: any): Promise<UserPresignedUrlsResponse> => {
  try {
    const imageKeys = await getImageKeysByUser(studentId);
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: imageKeys[0] }); // Assuming you want to use the first image key
    const signedUrls = await getSignedUrl(s3,command);
    return { signedUrls };
  } catch (err) {
    console.log(err);
    return { err };
  }
};


