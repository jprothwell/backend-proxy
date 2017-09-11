const createHandler = require('./index')
const request = require('supertest')
const http = require('http')

describe('Backend proxy lib', () => {
  describe('Test proxy', () => {
    let server
    beforeEach(() => {
      server = http.createServer(
        createHandler({ proxyUrl: 'https://reqres.in/api' })
      )
    })
    it('Proxy JSON properly', async () => {
      const response = await request(server).get('/users?page=3')
      expect(response.statusCode).toEqual(200)
    })
    it('Get body properly', async () => {
      const response = await request(server).get('/users/2')
      expect(response.body.data.id).toEqual(2)
    })
  })

  describe('Proxy with read only', () => {
    let server
    beforeEach(() => {
      server = http.createServer(
        createHandler({ proxyUrl: 'https://reqres.in/api', readOnly: true })
      )
    })
    it('Test read only', async () => {
      const response = await request(server).post('/users/1')
      expect(response.statusCode).toEqual(500)
    })
  })

  describe('Proxy post request', () => {
    let server
    beforeEach(() => {
      server = http.createServer(
        createHandler({ proxyUrl: 'https://reqres.in/api/' })
      )
    })
    it('Successful login attempt', async () => {
       const response = await request(server).post('/login')
        .set('Content-Type', 'application/json')
        .send(`{ "email": "peter@klaven", "password": "cityslicka" }`);
      console.log(response.body)
      expect(response.body.token).toEqual('QpwL5tke4Pnpja7X')
    })
  })
})
