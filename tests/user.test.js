const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require('../helper/bcrypt');
const { User } = require('../models');

// BEFORE TEST ======
beforeAll((done) => {
    // Create customer
    User.create({
        name: 'Ben',
        email: 'ben@mail.com',
        password: hashPassword('1234'),
        role: 'Marketing'
    })
        .then(user => {
            done()
        })
        .catch(err => {
            done()
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
                console.log(response.status);
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
describe('Fail LOGIN POST /login', () => {
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


// AFTER TEST CASE ======
afterAll((done) => {
    User.destroy({
        where: { email: 'ben@mail.com' }
    })
        .then(user => {
            done()
        })
        .catch(err => {
            done()
        })
})
// END AFTER TEST CASE ======