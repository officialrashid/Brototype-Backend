const jwt = require("jsonwebtoken");

const jwtVerification = function(secretKey) {
  console.log(secretKey, "secret cominggggg");

  return function(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);

    if (!token) {
      return res.json({ message: "Token is not found, please login" });
    } else {
      try {
        jwt.verify(token, secretKey, function(err, user) {
          if (err) {
            console.log(err, "error il kerriii");
            return res.status(401).json({ status: false, message: 'Unauthorized' });
          } else {
            req.user = user;
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

module.exports = jwtVerification;
