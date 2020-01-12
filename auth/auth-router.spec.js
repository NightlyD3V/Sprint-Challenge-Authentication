const server = require('../api/server')
const supertest = require('supertest')

describe('POST /api/auth/register', function() {
    it('Should return 201, user create', function() {
        return supertest(server)
        .get('/api/auth/register')
        .then((res) => {
            expect(res.status).toBe(201)
        })
    })
})