import jwt from 'jsonwebtoken';

/**
 * This function gives access only to registered users
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {void}
 */
export default function authenticate(req, res, next) {
  const token = req.body.token || req.query.token ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.secret, (err, decoded) => {
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
}
