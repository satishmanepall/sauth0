const jwtUtils = require('../_utils/jwtUtils');

function authenticateToken(req, res, next) {
   // console.log(123)
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];

  // if (!token) return res.sendStatus(401);
try{
    jwtUtils.verifyToken(req.body.auth_token, "bsxasjbcsabc", (err, user) => {
        if (err) return res.status(400).json({ success: false, message:"Invalid token or expire" });;
        console.log("success")
        req.user = user;
        next();
      });
}
  catch(error){
    return error
  }
}

module.exports = authenticateToken;
