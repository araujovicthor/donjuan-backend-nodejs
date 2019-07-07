'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      size_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'sizes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('prices')
  }
}
