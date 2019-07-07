const { Size, Type } = require('../models')

class SizeController {
  async index (req, res) {
    const filters = { where: {} }

    if (req.query.type_id) {
      filters.where.type_id = req.query.type_id
    }

    const sizes = await Size.findAll(filters)

    return res.json(sizes)
  }

  async show (req, res) {
    const size = await Size.findByPk(req.params.id)

    if (!size) {
      return res.status(400).json({ error: 'Size does not exists' })
    } else {
      return res.json(size)
    }
  }

  async store (req, res) {
    const { isAdmin } = req
    const { type_id } = req.body

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    const type = await Type.findByPk(type_id)

    if (!type) {
      return res.status(400).json({ error: 'Type does not exists' })
    }

    const { filename } = req.file

    const newSize = await Size.create({ ...req.body, avatar: filename })

    return res.json(newSize)
  }

  async update (req, res) {
    const { isAdmin } = req
    const { size } = req.body
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    const updateSize = await Size.update({ size: size }, { where: { id: id } })

    if (!updateSize) {
      return res.status(400).json({ error: 'Size does not exists' })
    } else {
      return res.json(await Size.findByPk(id))
    }
  }

  async destroy (req, res) {
    const { isAdmin } = req
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    await Size.destroy({ where: { id: id } })

    return res.send()
  }
}

module.exports = new SizeController()
