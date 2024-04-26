import { S3Client } from "@aws-sdk/client-s3"
import multerS3 from "multer-s3"
import multer from "multer"
import path from 'path'

const accessId:string|undefined =process.env.AWS_ACCESS_KEY_ID
const  secretKey:string|undefined=process.env.AWS_SECRET_ACCESS_KEY
const region:string|undefined= process.env.AWS_DEFAULT_REGION
interface file{
    fieldname:string,
    originalname:string,
    encoding:string,
    mimetype:string,
    size:number,  
}


const s3=new S3Client({
    credentials:{
        accessKeyId:`${process.env.AWS_ACCESS_KEY_ID}`,
        secretAccessKey:`${process.env.AWS_SECRET_ACCESS_KEY}`
    },
    region:'ap-south-1'
})

const s3Storage= multerS3({
    s3: s3, // s3 instance
    bucket: "brototypestorage", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        console.log('multer s333');
        
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
})
//function to sanitize files and send some errors for unsupported files
function sanitizeFile(file:file,cb:any){
    //define the allowed extension
    const fileExts=['.png','.jpg','.jpeg','.svg']

    const isAllowedExts=fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    )

    //mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/")

    if(isAllowedExts && isAllowedMimeType){
        return cb(null,true)
    }else{
        cb("Error:file is not allowed type")
    }
        
    }




const upload= multer({

    storage:s3Storage,
    fileFilter:(req, file, callback)=> {
        sanitizeFile(file,callback)        
    },
    limits:{
        fileSize:1024 * 1024 * 5 // 5 MB file size
    }
})

export {upload}
