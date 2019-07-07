module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    price: DataTypes.DECIMAL(10, 2)
  })

  Price.associate = models => {
    Price.belongsTo(models.Type, { foreignKey: 'type_id' })
    Price.belongsTo(models.Size, { foreignKey: 'size_id' })
  }

  return Price
}
