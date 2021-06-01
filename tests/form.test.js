const request = require('supertest');
const app = require("../app.js");
const { createToken } = require('../helper/jwt');
const { hashPassword } = require('../helper/bcrypt');
const {User, sequelize} = require('../models')
const {queryInterface} = sequelize

let access_token_user
let access_token_fail = '18ey102hdiaslihdao8se8qd'

beforeAll(done => {
  queryInterface.bulkInsert('Roles', [{
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
    }], {returning: ["id"]}
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
        return queryInterface.bulkInsert('Forms', [{
            clientName: "name1",
            formDetail: "detail1",
            fileAttachment: "attach1",
            formComplete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
      })
      .then(() => {
        return  User.findOne({
          where: { email: 'ben@mail.com'}
        }) 
        .then(user => {
          const payload = {id: user.id, email: user.email}
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

describe('/GET forms requirement', () => {
    it('should have a 200 status code, equal with the body value', function(done) {
      request(app)
      .get('/forms')
      .set('Accept', 'application/json')
      .set('access_token', access_token_user)
      .then(response => {
        expect(response.status).toBe(200)
        expect(typeof response.body).toEqual('object')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
    })

    it('should have a 401 status code, must need authentication', function(done) {
    request(app)
      .post('/forms')
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
  
  describe('/POST forms requirement', () => {

    let access_token_user

    beforeAll(done => {
      User.findOne({
        where: { email: 'ben@mail.com'}
      }) 
      .then(user => {
        const payload = {id: user.id, email: user.email}
        access_token_user = createToken(payload)
        console.log(access_token_user)
        done()
      })
      .catch((err) => {
        done(err)
      })
    })

    it('should have a 201 status code, equal with the body value', function(done) {
      let formData = {
        clientName: "name1",
        formDetail: "detail1",
        fileAttachment: "attach1",
        approvalList: [],
        formComplete: false,
     }
      request(app)
      .post('/forms')
      .set('access_token', access_token_user)
      .send(formData)
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
    })
  
    it('should have a 401 status code, must need authentication', function(done) {
      let formData = {
        clientName: "name1",
        formDetail: "detail1",
        fileAttachment: "attach1",
        approvalList: [],
        formComplete: false,
     }
    request(app)
      .post('/forms')
      .set('access_token', access_token_fail)
      .send(formData)
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
  
    it('should have a 400 status code, client name cannot be empty', function(done) {
      let formData = {
        clientName: "",
        formDetail: "detail1",
        fileAttachment: "attach1",
        approvalList: [],
        formComplete: false,
     }
    request(app)
      .post('/forms')
      .set('access_token', access_token_user)
      .send(formData)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual('client name cannot be empty')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
    })
    
    it('should have a 400 status code, form detail cannot be empty', function(done) {
      let formData = {
        clientName: "name1",
        formDetail: "",
        fileAttachment: "attach1",
        approvalList: [
            1, 2
        ]
     }
    request(app)
      .post('/forms')
      .set('access_token', access_token_user)
      .send(formData)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual('form detail cannot be empty')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
    })   
  
    it('should have a 400 status code, file attachment cannot be empty', function(done) {
      let formData = {
        clientName: "name1",
        formDetail: "detail1",
        fileAttachment: "",
        approvalList: [
            1, 2
        ]
     }
    request(app)
      .post('/forms')
      .set('access_token', access_token_user)
      .send(formData)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual('file attachment cannot be empty')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
    })

    it('should have a 400 status code, data cannot be empty', function(done) {
      let formData =  {
        clientName: "name1",
        formDetail: "detail1",
        fileAttachment: "attach1",
        approvalList: [
            "satu", "dua"
        ]
     }
      request(app)
        .post('/forms')
        .set('access_token', access_token_user)
        .send(formData)
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body).toHaveProperty('message')
          done()
        })
        .catch(err => {
          console.log(err);
          done(err)
        })
      })
       
    it('should have a 500 status code, approval list must be array', function(done) {
      let formData = {
        clientName: "name1",
        formDetail: "detail1",
        fileAttachment: "attach1",
        approvalList: ""
     }
    request(app)
      .post('/forms')
      .set('access_token', access_token_user)
      .send(formData)
      .then(response => {
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message')
        done()
      })
      .catch(err => {
        console.log(err);
        done(err)
      })
    })

    it('should have a 500 status code, data cannot be empty', function(done) {
      let formData = {}
      request(app)
        .post('/forms')
        .set('access_token', access_token_user)
        .send(formData)
        .then(response => {
          expect(response.status).toBe(500)
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
    queryInterface.bulkDelete('Roles',null, {})
    .then(() => {
        return queryInterface.bulkDelete('Users',null, {})
            .then(() => {
              return queryInterface.bulkDelete('Forms',null, {})
            })
            .then(() => {
              done()
            })
            .catch(err => {
                done(err)
        })
    })
})