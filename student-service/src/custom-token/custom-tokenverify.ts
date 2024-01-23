import * as admin from 'firebase-admin';

const serviceAccount = require('../../brototype-29983-firebase-adminsdk-9qeji-41b48a5487.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyTokenMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers['authorization'];
    console.log(token, "tokennnnnn");

    // Decode the ID token to get the user's UID
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken,"decode toooooo");
    
    const uid = decodedToken.uid;

    console.log(uid, "userrr ffirebaseee");
    console.log("verify section start");

    req.user = uid;
    console.log(req.user, "verify successs");
    return next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send(`Unauthorized. Invalid token. ${error}`);
  }
};

export default verifyTokenMiddleware;
