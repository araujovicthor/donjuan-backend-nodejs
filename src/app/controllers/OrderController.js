const { Size, Type, User, Product, Price } = require('../models')
const { Order } = require('../models')

class OrderController {
  async index (req, res) {
    const filters = { where: {} }
    filters.include = [
      {
        model: Price,
        as: 'Items',
        include: [
          { model: Size },
          { model: Type, include: [{ model: Product }] }
        ]
      },
      { model: User, attributes: ['name'] }
    ]
    filters.order = [['created_at', 'DESC']]

    const { isAdmin, userId } = req

    if (isAdmin !== true) {
      filters.where.user_id = userId
    }

    const orders = await Order.findAll(filters)

    if (!orders) {
      return res.status(400).json({ error: 'There is no order' })
    }

    return res.json(orders)
  }

  async show (req, res) {
    const order = await Order.findByPk(req.params.id)

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' })
    }

    return res.json(order)
  }

  async store (req, res) {
    const { isAdmin } = req
    req.body.user_id = req.userId

    if (isAdmin === true) {
      return res.status(400).json({ error: 'You can not make a order' })
    }

    const newOrder = await Order.create(req.body)

    req.body.data.map(async function ({ id }) {
      const associate = await newOrder.addItems(id)
      return associate
    })

    return res.json(newOrder)
  }
}

module.exports = new OrderController()
