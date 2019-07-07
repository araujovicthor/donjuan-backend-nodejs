module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalPrice: DataTypes.DECIMAL(10, 2),
    note: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    address: DataTypes.STRING,
    number: DataTypes.INTEGER,
    neighborhood: DataTypes.STRING
  })

  Order.associate = models => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' })
    Order.belongsToMany(models.Price, {
      as: 'Items',
      otherKey: 'item_id',
      foreignKey: 'order_id',
      through: models.Cart
    })
  }

  return Order
}
