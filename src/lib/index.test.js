const createHandler = require('./index')
const request = require('supertest')
const http = require('http')

describe('Backend proxy lib', () => {
  let server
  beforeEach(() => {
    server = http.createServer(
      createHandler({ proxyUrl: 'https://reqres.in/' })
    )
  })
  it('Proxy JSON properly', async () => {
    const response = await request(server).get('/posts/1')
    expect(response.statusCode).toEqual(200)
  })
  it('Get body properly', async () => {
    const response = await request(server).get('/api/users/2')
    expect(response.body.data.id).toEqual(2)
  })
  
})
