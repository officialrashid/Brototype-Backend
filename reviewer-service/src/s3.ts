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
  reviewerId: string;
  imageUrl?: string; // Make imageUrl optional
}

export const uploadToS3 = async ({ file, reviewerId }: ProfileUpdate): Promise<ProfileUpdate> => {
  const key = `${reviewerId}/${uuid()}`;
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

    return { file, reviewerId, imageUrl: url };
  } catch (err) {
    console.error(err,"pppppppppppppp");
    return { file, reviewerId, imageUrl: undefined }; 
  }
  
};
// const getImageKeysByUser = async (reviewerId:any) =>{
//   const command = new ListObjectsV2Command({
//     Bucket: BUCKET,
//     Prefix:reviewerId
//   })

// const {Contents = []} = await s3.send(command)
// return Contents.map(image => image.Key)
// } 
// export const getUserPresignedUrls = async (reviewerId: any): Promise<UserPresignedUrlsResponse> => {
//   try {
//     const imageKeys = await getImageKeysByUser(reviewerId);
//     const command = new GetObjectCommand({ Bucket: BUCKET, Key: imageKeys[0] }); // Assuming you want to use the first image key
//     const signedUrls = await getSignedUrl(s3,command);
//     return { signedUrls };
//   } catch (err) {
//     console.log(err);
//     return { err };
//   }
// };


