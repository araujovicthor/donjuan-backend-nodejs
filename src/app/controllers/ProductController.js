const { Product } = require('../models')

class ProductController {
  async index (req, res) {
    const products = await Product.findAll()

    return res.json(products)
  }

  async show (req, res) {
    const product = await Product.findByPk(req.params.id)

    if (!product) {
      return res.status(400).json({ error: 'Product do not exists' })
    } else {
      return res.json(product)
    }
  }

  async store (req, res) {
    const { isAdmin } = req
    const { product } = req.body

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    if (await Product.findOne({ where: { product: product } })) {
      return res.status(400).json({ error: 'Product already exists' })
    }

    const { filename } = req.file

    const newProduct = await Product.create({ ...req.body, avatar: filename })

    return res.json(newProduct)
  }

  async update (req, res) {
    const { isAdmin } = req
    const { product } = req.body
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    const updateProduct = await Product.update(
      { product: product },
      { where: { id: id } }
    )

    if (!updateProduct) {
      return res.status(400).json({ error: 'Product do not exists' })
    } else {
      return res.json(await Product.findByPk(id))
    }
  }

  async destroy (req, res) {
    const { isAdmin } = req
    const { id } = req.params

    if (isAdmin !== true) {
      return res.status(400).json({ error: 'No admin permission' })
    }

    await Product.destroy({ where: { id: id } })

    return res.send()
  }
}

module.exports = new ProductController()
