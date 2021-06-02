const request = require('supertest');
const app = require("../app.js");
const { createToken } = require('../helper/jwt');
const { hashPassword } = require('../helper/bcrypt');
const { Form, User, sequelize } = require('../models')
const { queryInterface } = sequelize

let approvalUserId
let approvalFormId
let foundId

let access_token_user
let access_token_fail = '18ey102hdiaslihdao8se8qd'

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
      ], {returning: true})
        .then((data) => {

          approvalUserId = data[0].id

          return queryInterface.bulkInsert('Forms', [{
            clientName: "name1",
            formDetail: "detail1",
            fileAttachment: "attach1",
            formComplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }], {returning: true})
        })
        .then((data) => {

          approvalFormId = data[0].id
            console.log(approvalFormId, approvalUserId, 'ini data insert');
            return queryInterface.bulkInsert('Approvals', [{
              UserId: approvalUserId,
              FormId: approvalFormId,
              approvalStatus: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }], {returning: true})
          })
        .then((data) => {
          foundId = data[0].id
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

describe('/GET Dashboard Data requirement', () => {

  it('should have a 200 status code, equal with the body value', function (done) {
    request(app)
      .get('/approval/history')
      .set('Accept', 'application/json')
      .set('access_token', access_token_user)
      .then(response => {
        const {body, status} = response
        console.log(body,status, 'ini data test');
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
  })

  it('should have a 200 status code, equal with the body value', function (done) {
    request(app)
      .get('/approval/client')
      .set('Accept', 'application/json')
      .set('access_token', access_token_user)
      .then(response => {
        const {body, status} = response
        console.log(body,status, 'ini data test');
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
  })

  it('should have a 200 status code, equal with the body value', function (done) {
    request(app)
      .get(`/approval/${foundId}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_user)
      .then(response => {
        const {body, status} = response
        console.log(body,status, 'ini data test');
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
  })

  it('should have a 200 status code, equal with the body value', function (done) {
    let dataStatus = {}
    request(app)
      .patch(`/approval/${foundId}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_user)
      .send(dataStatus)
      .then(response => {
        const {body, status} = response
        console.log(body,status, 'ini data test');
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
  })

  it('should have a 200 status code, equal with the body value', function (done) {
    request(app)
      .delete(`/approval/${foundId}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_user)
      .then(response => {
        const {body, status} = response
        console.log(body,status, 'ini data test');
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
  })

  it('should have a 401 status code, must need authentication', function (done) {
    request(app)
      .get('/approval/history')
      .set('access_token', access_token_fail)
      .then(response => {
        expect(response.status).toBe(401)
        expect(typeof response.body).toEqual('object')
        expect(response.body).toHaveProperty('message')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
  })
})

afterAll((done) => {
  queryInterface.bulkDelete('Roles', null, {})
    .then(() => {
      return queryInterface.bulkDelete('Users', null, {})
        .then(() => {
          return queryInterface.bulkDelete('Forms', null, {})
        })
        .then(() => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })
})