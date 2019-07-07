module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    size: DataTypes.STRING,
    avatar: DataTypes.STRING
  })

  Size.associate = models => {
    Size.belongsTo(models.Type, { foreignKey: 'type_id' })
  }

  return Size
}
