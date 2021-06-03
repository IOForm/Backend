'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Forms', [{
      clientName: 'PT. Manufaktur',
      formDetail: 'Permintaan Pengadaan Baja Kanal U',
      fileAttachment: '1',
      formComplete: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      clientName: 'PT. Baja Manufaktur',
      formDetail: 'Permintaan Pengadaan Baja CNP',
      fileAttachment: '1',
      formComplete: true,
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
    await queryInterface.bulkDelete('Forms', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
