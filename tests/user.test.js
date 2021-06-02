const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require('../helper/bcrypt');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;

// BEFORE TEST ======
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
            done()
        })
        .catch(err => {
             done(err)
        })
    })
})

// TEST LOGIN SUCCESS
let loginInput = {
    email: 'ben@mail.com',
    password: '1234'
}

describe('Login success admin POST /login', () => {
    it('response with id, email, and access_token', function (done) {
        request(app)
            .post('/login')
            .send(loginInput)
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', expect.any(String))
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})


// TEST ERROR FAIL PASSWORD
// Input ----
let failPassword = {
    email: 'ben@mail.com',
    password: 'asd'
}

let invalidEmail = {
    email: 'adminDev@mail.com',
    password: '1234'
}

let blankInput = {
    email: '',
    password: ''
}
// END Input ----

// FAIL LOGIN
describe('Fail login POST /login', () => {
    // WRONG PASSWORD
    it('response with status', function (done) {
        request(app)
            .post('/login')
            .send(failPassword)
            .set('Accept', 'application/json')
            .expect(404)
            .then(response => {
                let { status } = response
                expect(status).toBe(404)
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // WRONG EMAIL
    it('response with status', function (done) {
        request(app)
            .post('/login')
            .send(invalidEmail)
            .set('Accept', 'application/json')
            .expect(404)
            .then(response => {
                let { status } = response
                expect(status).toBe(404)
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // NO INPUTED EMAIL AND PASSWORD
    it('response with status', function (done) {
        request(app)
            .post('/login')
            .send(blankInput)
            .set('Accept', 'application/json')
            .expect(404)
            .then(response => {
                let { status } = response
                expect(status).toBe(404)
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})


// REGISTER USER ======
describe('Register User POST /register', () => {
    // SUCCESS REGISTER
    let newUser = {
        name: 'Dimas',
        email: 'dimas@mail.com',
        password: hashPassword('asd'),
        RoleId: 4,
    }

    it('response with status 201 and property name, email, RoleId', function (done) {
        request(app)
            .post('/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(201)
            .then(response => {
                let { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', newUser.name)
                expect(body).toHaveProperty('email', newUser.email)
                expect(body).toHaveProperty('RoleId', newUser.RoleId)
                done()
            })
            .catch(err => {
                done()
            })
    })

    // FAIL REGISTER
    let failRegister = {
        name: 'Lala',
        email: '',
        password: hashPassword('asd'),
        RoleId: '',
    }

    it('response with status 400 and property name, email, RoleId', function (done) {
        request(app)
            .post('/register')
            .send(failRegister)
            .set('Accept', 'application/json')
            .expect(400)
            .then(response => {
                let { status } = response
                expect(status).toBe(400)
                done()
            })
            .catch(err => {
                done()
            })
    })
})


// AFTER TEST CASE ======
afterAll((done) => {
    queryInterface.bulkDelete('Roles',null, {})
    .then(() => {
        return queryInterface.bulkDelete('Users',null, {})
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
        })
    })
})
// END AFTER TEST CASE ======