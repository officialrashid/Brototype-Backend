import schema from "../dataBase/schema"
import config from "../../../config/config";
import jwt from 'jsonwebtoken'

import admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json'
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});
interface Student {
  _id: string;
  name?: string | null; // The '?' indicates the property is optional
  email?: string | null; // The '?' indicates the property is optional
}
interface studentLogin {
   uniqueId: String
}
export default {

 
  
 
  
 
}