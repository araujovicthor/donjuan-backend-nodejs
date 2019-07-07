'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('products', 'description', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('products', 'time', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('products', 'description'),
      queryInterface.removeColumn('products', 'time')
    ])
  }
}
