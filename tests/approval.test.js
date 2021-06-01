const request = require("supertest");
const app = require("../app.js");
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const secret_jwt = 'ioform'

// Token
function createToken(userObject) {
    return jwt.sign(userObject, secret_jwt)
}
// Global variable ======
let access_token
let userLogin
let not_admin_access_token

// Admin login ======
let loginInput = {
    email: 'ben@mail.com',
    password: '1234'
}
// Not Admin login ======
let notAdminLogin = {
    email: 'jono@mail.com',
    password: 'rahasia'
}

// BEFORE TEST ======
beforeAll(done => {
    // ADMIN
    User.findOne({
        where: { email: loginInput.email }
    })
        .then(user => {
            access_token = createToken({
                id: user.id,
                email: user.email
            })
            return request(app)
                .post('/login')
                .send(loginInput)
                .set('Accept', 'application/json')
                .expect(200)
        })
        .then(response => {
            let { body, status } = response
            userLogin = body
            access_token = body.access_token
            done()
        })
        .catch(err => {
            done()
        })
    // NOT ADMIN
    User.findOne({
        where: { email: notAdminLogin.email }
    })
        .then(user => {
            access_token = createToken({
                id: user.id,
                email: user.email
            })
            return request(app)
                .post('/login')
                .send(notAdminLogin)
                .set('Accept', 'application/json')
                .expect(200)
        })
        .then(response => {
            let { body, status } = response
            not_admin_access_token = body.access_token
            done()
        })
        .catch(err => {
            done()
        })
})

describe('APPROVAL ENDPOINT /approval', () => {
    // CREATE
    it('CREATE APPROVAL response with status and json / POST', function (done) {
        const newApproval = {
            UserId: userLogin.id,
            FormId: 1, //
            approvalStatus: false
        }
        request(app)
            .post('/approval')
            .send(newApproval)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect(201)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty('UserId', expect.any(Number))
                expect(body).toHaveProperty('FormId', expect.any(Number))
                expect(body).toHaveProperty('approvalStatus', expect.any(Boolean))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // FIND ALL
    it('GET APPROVALS response with status / GET', function (done) {
        request(app)
            .get('/approval')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
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
    // FIND ALL BY USER LOGIN
    it('GET APPROVALS BY LOGIN USER response with status / GET', function (done) {
        request(app)
            .get('/approval/user')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
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
    // EDIT
    it('EDIT ONE APPROVAL response with status and json / PUT', function (done) {
        let editApproval = {
            approvalStatus: true
        }
        request(app)
            .patch('/approval/2')
            .send(editApproval)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
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
    // DELETE ONE
    it('DELETE ONE APPROVAL response with status / DELETE', function (done) {
        request(app)
            .delete('/approval/1')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
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


    // ERRROR CASES
    // DELETE NO TOKEN
    it('ERROR DELETE NO TOKEN response with status / DELETE', function (done) {
        request(app)
            .delete('/approval/1000')
            .set('Accept', 'application/json')
            .expect(404)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(404);
                done()
            })
            .catch(err => {
                done(err)
            })
        done()
    })
    // DELETE NOT ADMIN
    it('ERROR DELETE NOT ADMIN response with status / DELETE', function (done) {
        request(app)
            .delete('/approval/1000')
            .set('Accept', 'application/json')
            .set('access_token', not_admin_access_token)
            .expect(401)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(401);
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

afterAll(done => {
    done()
})