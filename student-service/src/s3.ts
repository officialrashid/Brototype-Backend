import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA2PZTHJKAKZ7SZDUZ",
    secretAccessKey: "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",
  },
});

const BUCKET = "brototype-students-profile";

interface ProfileUpdate {
  file: {
    buffer: Buffer;
    mimetype: string;
  };
  studentId: string;
  imageUrl?: string; // Make imageUrl optional
}

export const uploadToS3 = async ({ file, studentId }: ProfileUpdate): Promise<ProfileUpdate> => {
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

    const url: string = `https://s3.ap-south-1.amazonaws.com/${BUCKET}/${key}`;
    console.log(url, "url coming s3");

    return { file, studentId, imageUrl: url }; // Include imageUrl in the return object
  } catch (err) {
    console.error(err);
    return { file, studentId, imageUrl: undefined }; // Include imageUrl in case of error as well
  }
};
