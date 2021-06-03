'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Approvals', [{
      UserId: 1,
      FormId: 1,
      approvalStatus: true,
      rejected: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 2,
      FormId: 1,
      approvalStatus: true,
      rejected: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 3,
      FormId: 1,
      approvalStatus: true,
      rejected: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 1,
      FormId: 2,
      approvalStatus: false,
      rejected: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 3,
      FormId: 2,
      approvalStatus: false,
      rejected: false,
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
