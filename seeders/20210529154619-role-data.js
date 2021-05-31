'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      name: 'Stakeholder',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Finance',
      position: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Head of Division',
      position: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Admin',
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
