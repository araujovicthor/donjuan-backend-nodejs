const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ProductController = require('./app/controllers/ProductController')
const TypeController = require('./app/controllers/TypeController')
const SizeController = require('./app/controllers/SizeController')
const PriceController = require('./app/controllers/PriceController')
const OrderController = require('./app/controllers/OrderController')
const FileController = require('./app/controllers/FileController')

routes.post('/signin', UserController.store)
routes.post('/sessions', SessionController.store)

routes.get('/files/:file', FileController.show)

routes.use(authMiddleware)

// Rotas para produtos
routes.get('/products', ProductController.index)
routes.get('/products/:id', ProductController.show)
routes.post('/products', upload.single('avatar'), ProductController.store)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.destroy)

// Rotas para Tipos
routes.get('/types', TypeController.index)
routes.get('/types/:id', TypeController.show)
routes.post('/types', upload.single('avatar'), TypeController.store)
routes.put('/types/:id', TypeController.update)
routes.delete('/types/:id', TypeController.destroy)

// Rotas para Tamanhos
routes.get('/sizes', SizeController.index)
routes.get('/sizes/:id', SizeController.show)
routes.post('/sizes', upload.single('avatar'), SizeController.store)
routes.put('/sizes/:id', SizeController.update)
routes.delete('/sizes/:id', SizeController.destroy)

// Rotas para preços
routes.get('/prices', PriceController.index)
routes.get('/prices/:id', PriceController.show)
routes.post('/prices', PriceController.store)
routes.put('/prices/:id', PriceController.update)
routes.delete('/prices/:id', PriceController.destroy)

// Rotas para pedidos
routes.get('/orders', OrderController.index)
routes.get('/orders/:id', OrderController.show)
routes.post('/orders', OrderController.store)

module.exports = routes
