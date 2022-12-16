require('../../test-setup');
const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const expect = require('chai').expect;

describe('Auth route tests', () => {
  it('POST: /auth/login - validate email and password', async () => {
    const res = await request.post('/auth/login');
    expect(res.body).haveOwnProperty('errors').length(2);
  });

  it('POST: /auth/register - validate name, email and password', async () => {
    const res = await request.post('/auth/register')
      .send({  });

    expect(res.body).haveOwnProperty('errors').length(3);
  });

});

