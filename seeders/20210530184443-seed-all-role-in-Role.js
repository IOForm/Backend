'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [{
      role: 'Stakeholder',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'Finance',
      position: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'Head of Division',
      position: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'Admin',
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {})
  }
};
