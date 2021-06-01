const request = require("supertest");
const app = require("../app.js");
const { Role } = require('../models');

// BEFORE TEST ===================
beforeAll(done => {
    done()
})

describe('ROLE ENDPOINT /role', () => {
    // FIND ALL
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
            role: 'RnD',
            position: 6,
            createdAt: new Date(),
            updatedAt: new Date()
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
                expect(body).toHaveProperty('role', expect.any(String))
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
            .get('/role/4')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                let { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('role', expect.any(String))
                expect(body).toHaveProperty('position', expect.any(Number))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    // EDIT
    it('EDIT ONE ROLE response with status and json / PATCH', function (done) {
        let editRole = {
            role: 'RnD',
            position: 7
        }
        request(app)
            .patch('/role/23')
            .send(editRole)
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
    // DELETE ONE
    it('DELETE ONE ROLE response with status / DELETE', function (done) {
        request(app)
            .del('/role/2')
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

    // ERROR CASES TEST ===========================
    // ERROR CREATE
    it('ERROR CREATE ROLE response with status and json / POST', function (done) {
        let newERRORROLE = {
            role: '',
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
    // ERROR EDIT ONE
    it('ERROR EDIT ONE ROLE response with status and json / PATCH', function (done) {
        let editERRORRole = {
            role: '',
            position: ''
        }
        request(app)
            .patch('/role/23')
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
    // ERROR FIND ONE
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
        .then(result => { done() })
        .catch(err => console.log(err))
})