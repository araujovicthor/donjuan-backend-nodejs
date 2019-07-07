const { Price, Size, Type, Product } = require('../models')

class PriceController {
  async index (req, res) {
    const filters = { where: {} }
    filters.include = [
      { model: Size },
      { model: Type, include: [{ model: Product }] }
    ]

    if (req.query.type_id) {
      filters.where.type_id = req.query.type_id
    }

    if (req.query.size_id) {
      filters.where.size_id = req.query.size_id
    }

    const prices = await Price.findAll(filters)

    if (!prices) {
      return res.status(400).json({ error: 'Price does not exists' })
    }

    return res.json(prices)
  }

  async show (req, res) {
    const filters = { }
    filters.include = [
      { model: Size },
      { model: Type, include: [{ model: Product }] }
    ]

    const price = await Price.findByPk(req.params.id, filters)

    if (!price) {
      return res.status(400).json({ error: 'Price does not exists' })
    }

    return res.json(price)
  }

  async store (req, res) {
    const { isAdmin } = req
    const { type_id, size_id } = req.body

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    const type = await Type.findByPk(type_id)
    const size = await Size.findByPk(size_id)

    if (!type || !size) {
      return res.status(400).json({ error: 'Type/Size does not exists' })
    }

    const newPrice = await Price.create(req.body)

    return res.json(newPrice)
  }

  async update (req, res) {
    const { isAdmin } = req
    const { price } = req.body
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    const updatePrice = await Price.update(
      { price: price },
      { where: { id: id } }
    )

    if (!updatePrice) {
      return res.status(400).json({ error: 'Price does not exists' })
    } else {
      return res.json(await Price.findByPk(id))
    }
  }

  async destroy (req, res) {
    const { isAdmin } = req
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    await Price.destroy({ where: { id: id } })

    return res.send()
  }
}

module.exports = new PriceController()
