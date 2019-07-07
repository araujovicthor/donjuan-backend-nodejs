module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    type: DataTypes.STRING,
    avatar: DataTypes.STRING
  })

  Type.associate = models => {
    Type.belongsTo(models.Product, { foreignKey: 'product_id' })
  }

  return Type
}
