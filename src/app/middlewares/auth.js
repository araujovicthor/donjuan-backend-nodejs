const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    if (
      (decoded.admin === false && req.headers.plataform !== 'mobile') ||
      (decoded.admin === true && req.headers.plataform !== 'web')
    ) {
      return res
        .status(400)
        .json({ error: 'Try to connect to another platform (web/mobile)' })
    }

    req.userId = decoded.id
    req.isAdmin = decoded.admin
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
