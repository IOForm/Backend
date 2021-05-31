'use strict';
const { hashPassword } = require('../helper/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'jono@mail.com',
      name: 'jono',
      password: hashPassword('rahasia'),
      RoleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'jana@mail.com',
      name: 'jana',
      password: hashPassword('rahasia'),
      RoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'jaka@mail.com',
      name: 'jaka',
      password: hashPassword('rahasia'),
      RoleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'admin@mail.com',
      name: 'admin',
      password: hashPassword('rahasia'),
      RoleId: 4,
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
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
