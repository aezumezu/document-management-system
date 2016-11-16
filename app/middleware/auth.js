'use strict';

const jwt = require('jsonwebtoken');

const authenticate = function (req, res, next) {
  const token = req.body.token || req.query.token ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.secret, function (err, decoded) {
      if (err) {
        return res.status(401)
          .json({ error: err.message });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      error: 'No token provided.'
    });
  }
};

module.exports = authenticate;