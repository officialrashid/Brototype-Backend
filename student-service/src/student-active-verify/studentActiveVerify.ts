

const studentActiveVerification = async function(studentId:string) {
  
    return async function  (req:any, res:any, next:any) {
    
      if (!studentId) {
        return res.json({ message: "student not found" });
      } else {
        try {
        const response = await  

        //   jwt.verify(token, secretKey, function(err, user) {
        //     if (err) {
         
        //     } else {
        //       req.user = user;
        //       next();
        //     }
        //   });
        } catch (err) {
          return res.json({
            message: 'Error occurred while verifying account using JWT, token is not matching',
            error: err
          });
        }
      }
    };
  };
  
  module.exports = studentActiveVerification;