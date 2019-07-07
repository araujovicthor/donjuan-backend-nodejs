module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product: DataTypes.STRING,
    description: DataTypes.STRING,
    time: DataTypes.STRING,
    avatar: DataTypes.STRING
  })

  return Product
}
