const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  User.prototype.compareHash = function (password) {
    return bcrypt.compare(password, this.password)
  }

  User.prototype.generateToken = function ({ id, admin }) {
    return jwt.sign({ id, admin }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }

  return User
}
