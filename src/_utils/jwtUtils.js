const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
  return jwt.sign(payload, "bsxasjbcsabc", { expiresIn: '3m' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, "bsxasjbcsabc", { expiresIn: '20m' });
}

function verifyToken(token, secret, callback) {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log("error")
      return callback(err, null); // Pass error to the callback
    }
    callback(null, decoded); // No error, pass decoded token
  });
}

function verifyRefreshToken(token, secret) {
  return jwt.verify(token, secret);
}
module.exports = { generateAccessToken, generateRefreshToken, verifyToken ,verifyRefreshToken };
