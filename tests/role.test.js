const request = require("supertest");
const app = require("../app.js");
const { Role, sequelize, User } = require('../models');
const { createToken } = require('../helper/jwt');
const { hashPassword } = require('../helper/bcrypt');
const { queryInterface } = sequelize

let foundId
let access_token_user

// BEFORE TEST ===================
beforeAll(done => {
    queryInterface.bulkInsert('Roles', [{
      name: 'Stakeholder',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Finance',
      position: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Head of Division',
      position: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Admin',
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: ["id"] }
    )
      .then((data) => {
        return queryInterface.bulkInsert('Users', [
          {
            email: 'ben@mail.com',
            name: 'Ben',
            password: hashPassword('1234'),
            RoleId: data[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ])
          .then(() => {
            return User.findOne({
              where: { email: 'ben@mail.com' }
            })
              .then(user => {
                const payload = { id: user.id, email: user.email }
                access_token_user = createToken(payload)
                console.log(access_token_user)
                done()
              })
              .catch((err) => {
                done(err)
              })
          })
      })
  })

describe('ROLE ENDPOINT /role', () => {
    let access_token_user

    // FIND ALL
    beforeAll(done => {
        User.findOne({
          where: { email: 'ben@mail.com' }
        })
          .then(user => {
            const payload = { id: user.id, email: user.email }
            access_token_user = createToken(payload)
            let dataform = {
                name: 'RnD',
                position: 7
            }
            return Role.create(dataform)
          })
          .then(response => {
            foundId = +response.id
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    
      afterAll(done => {
        queryInterface.bulkDelete('Roles')
          .then(() => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })


    it('GET ROLES response with status / GET', function (done) {
        request(app)
            .get('/role')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(200);
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // CREATE
    it('CREATE ROLE response with status and json / POST', function (done) {
        let newROLE = {
            name: 'RnD',
            position: 6,
        }
        request(app)
            .post('/role')
            .send(newROLE)
            .set('Accept', 'application/json')
            .expect(201)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('position', expect.any(Number))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // FIND ONE
    it('GET ONE ROLES response with status / GET', function (done) {
        request(app)
            .get(`/role/${foundId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('position', expect.any(Number))
                done()
            })
            .catch(err => {
                console.log(err, 'ini error');
                done(err)
            })
    })
    // EDIT
    it('EDIT ONE ROLE response with status and json / PATCH', function (done) {
        let editRole = {
            name: 'RnD',
            position: 7
        }
        request(app)
            .put(`/role/${foundId}`)
            .send(editRole)
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                let { status, body } = response;
                console.log(body, 'ini body');
                console.log(status, 'ini status');
                expect(status).toBe(200);
                done()

            })
            .catch(err => {
                done(err)
            })
    })
    // // DELETE ONE
    it('DELETE ONE ROLE response with status / DELETE', function (done) {
        request(app)
            .del(`/role/${foundId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                let { status } = response;
                expect(status).toBe(200);
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    // // ERROR CASES TEST ===========================
    // // ERROR CREATE
    it('ERROR CREATE ROLE response with status and json / POST', function (done) {
        let newERRORROLE = {
            name: '',
            position: 6,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        request(app)
            .post('/role')
            .send(newERRORROLE)
            .set('Accept', 'application/json')
            .expect(400)
            .then(response => {
                let { status } = response;
                expect(status).toBe(400);
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // // ERROR EDIT ONE
    it('ERROR EDIT ONE ROLE response with status and json / PATCH', function (done) {
        let editERRORRole = {
            name: '',
            position: ''
        }
        request(app)
            .put('/role/23')
            .send(editERRORRole)
            .set('Accept', 'application/json')
            .expect(400)
            .then(response => {
                let { status } = response;
                expect(status).toBe(400);
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // // ERROR FIND ONE
    it('ERROR GET ONE ROLES response with status / GET', function (done) {
        request(app)
            .get('/role/1000')
            .set('Accept', 'application/json')
            .expect(404)
            .then(response => {
                let { status } = response;
                expect(status).toBe(404);
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

afterAll(done => {
    Role.destroy({ where: { position: 6 } })
        .then(result => { return queryInterface.bulkDelete('Roles', null, {}) })
        .then(result => { done() })
        .catch(err => console.log(err))
})