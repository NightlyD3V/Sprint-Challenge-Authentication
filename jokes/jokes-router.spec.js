const server = require('../api/server')
const supertest = require('supertest')
const db = require('../database/dbConfig')

describe('GET /api/jokes', function() {
    it('Should return 200 if user has token', function() {
        const testUser = db.findBy('Tyler')
        return supertest(server)
        .get('/api/jokes', {headers:{authorization: testUser.token}})
        .then((res) => {
            expect(res.status).toBe(200)
        })
    })
})