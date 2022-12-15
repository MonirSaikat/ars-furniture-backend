require('../../test-setup');
const supertest = require('supertest');
const app = require('../../index');
const request = supertest(app);
const expect = require('chai').expect;
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzliNzEzYTk3NzJiNjgzMjZjM2UzOGYiLCJlbWFpbCI6InNhaWthdDFAZ21haWwuY29tIiwiaWF0IjoxNjcxMTMxNDUxLCJleHAiOjE2NzEyMTc4NTF9.a5hmTyp9DSi6SQuzGmuomh4tSacFSiDOh7m_OIWd2GY';

describe('Tests for /reviews routs', () => {
  it('GET: 403 statuscode for non admin users for all reviews', async () => {
    const res = await request.get('/reviews');

    expect(res.statusCode).to.equal(401);
  });

  it('GET: 200 status code for getting all sites reviews for unauthencated users', async () => {
    const res = await request
      .get('/reviews/site')
      .auth(authToken, { type: 'bearer' });

    expect(res.statusCode).equal(200);
    expect(res.body).to.be.an('array').which.is.empty;
  });

  it('GET: 403 statusCode for accessing by non admin users', async () => {
    const res = await request.get('/reviews')
      .auth(authToken, {type: 'bearer'});

    expect(res.statusCode).to.equal(403);
  });

  it('POST: 201 status code for adding a review by authenticated user', async () => {
    const res = await request.post('/reviews')
      .auth(authToken, { type: 'bearer' })
      .send({
        text: 'My good review',
        rating: 3.4
      });

      expect(res.statusCode).to.equal(201);
      expect(res.body).haveOwnProperty('_id');
  });

  it('POST: 403 statusCode for adding a review by unauthenticated user', async () => {
    const res = await request.post('/reviews')
      .send({
        text: 'My text',
        rating: 4.4
      });

    expect(res.statusCode).to.equal(401);
  });

  it('POST: get an error without text field in body', async () => {
    const res = await request.post('/reviews')
      .auth(authToken, { type: 'bearer' })
      .send({ rating: 3.3 });

    expect(res.body).haveOwnProperty('success').to.equal(false);
    expect(res.body).haveOwnProperty('errors').length(1);
  });

});
