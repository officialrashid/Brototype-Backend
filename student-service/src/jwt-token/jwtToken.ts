// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }

// const secretKey = 'd2365790aadbaef646d8825c53a3e3822447333cd0898f2d1df5854ffbaf8f9375d66c0156ed9a68f6432e84ea6de0d77424834ff57bedd55a4bd9b719b3fde3'||'secretidofAccessTokenjwt';

// function authenticateToken(req: Request, res: Response, next: NextFunction): void {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     res.status(401).json({ status: false, message: 'Token not found' });
//     return;
//   }

//   try {
//     const token = authHeader; // Directly use the token without splitting
// console.log(token,"token comigg");

//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) {
//         console.error(err);
//         res.status(401).json({ status: false, message: 'Unauthorized' });
//         return;
//       }

//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ status: false, message: 'Invalid token' });
//     return;
//   }
// }

// export = authenticateToken;


import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const jwtVerification = (secretKey: string) => {
  console.log(secretKey, "secret cominggggg");

  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (!token) {
      return res.json({ message: "Token is not found, please login" });
    } else {
      try {
        jwt.verify(token, secretKey, (err, user) => {
          if (err) {
            console.log(err,"error il kerriii");
            
            return res.status(401).json({ status: false, message: 'Unauthorized' });
          } else {
            req.user = user as JwtPayload;
            next();
          }
        });
      } catch (err) {
        return res.json({
          message: 'Error occurred while verifying account using JWT, token is not matching',
          error: err
        });
      }
    }
  };
};




