const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the header
  if (!req.header('Authorization')) {
    return res.status(401).json({ message: 'No Token Provided' });
  }
  const token = req.header('Authorization').split(' ')[1];

  // Check if the header has a token
  if (!token) {
    return res.status(401).json({ message: 'No token auth denied' });
  }

  // Verify the token sent in the header (check for validity)
  try {
    const decoded = jwt.verify(token, config.get('JSONTokenSecretNormalUser'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
