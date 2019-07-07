const { User } = require('../models')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    if (
      (user.admin === false && req.headers.plataform !== 'mobile') ||
      (user.admin === true && req.headers.plataform !== 'web')
    ) {
      return res.status(400).json({
        error:
          'Você não tem permissão para conectar a essa plataforma (web/mobile)'
      })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Senha Inválida' })
    }

    return res.json({ userName: user.name, token: user.generateToken(user) })
  }
}

module.exports = new SessionController()
