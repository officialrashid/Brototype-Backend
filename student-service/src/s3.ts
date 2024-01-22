import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA2PZTHJKAKZ7SZDUZ",
    secretAccessKey: "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",
  },
});

interface governmentIdDetails {
  file: {
    buffer: Buffer;
    mimetype: string;
  };
  studentId: string;
  isGovernmentId: boolean;
  imageUrl?: string; // Make imageUrl optional
}

export const uploadToS3 = async ({ file, studentId, isGovernmentId }: governmentIdDetails): Promise<governmentIdDetails> => {
  const BUCKET = isGovernmentId ? "brototype-students-aadhar" : "brototype-students-profile";
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

    return { file, studentId, isGovernmentId, imageUrl: url }; // Include isAadhar in the return object
  } catch (err) {
    console.error(err);
    return { file, studentId, isGovernmentId, imageUrl: undefined }; // Include isAadhar in case of error as well
  }
};
