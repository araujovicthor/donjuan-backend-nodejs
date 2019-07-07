const { Type, Product } = require('../models')

class TypeController {
  async index (req, res) {
    const filters = { where: {} }

    if (req.query.product_id) {
      filters.where.product_id = req.query.product_id
    }

    const types = await Type.findAll(filters)

    return res.json(types)
  }

  async show (req, res) {
    const type = await Type.findByPk(req.params.id)

    if (!type) {
      return res.status(400).json({ error: 'Type does not exists' })
    } else {
      return res.json(type)
    }
  }

  async store (req, res) {
    const { isAdmin } = req
    const { product_id } = req.body

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    const product = await Product.findByPk(product_id)

    if (!product) {
      return res.status(400).json({ error: 'Product does not exists' })
    }

    const { filename } = req.file

    const newType = await Type.create({ ...req.body, avatar: filename })

    return res.json(newType)
  }

  async update (req, res) {
    const { isAdmin } = req
    const { type } = req.body
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    const updateType = await Type.update({ type: type }, { where: { id: id } })

    if (!updateType) {
      return res.status(400).json({ error: 'Type does not exists' })
    } else {
      return res.json(await Type.findByPk(id))
    }
  }

  async destroy (req, res) {
    const { isAdmin } = req
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    await Type.destroy({ where: { id: id } })

    return res.send()
  }
}

module.exports = new TypeController()
