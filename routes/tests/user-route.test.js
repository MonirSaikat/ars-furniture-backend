const server = require('../../index');
const superTest = require('supertest');
const requestWithSupertest = superTest(server);

describe('User endpoint', () => {
  it('GET / this sould get all users', async () => {
    const res = await requestWithSupertest.get('/users');
    expect(res.status).toEqual(401);
  });
});
