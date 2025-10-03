import request from 'supertest';
import express from 'express';
import usersRouter from '../src/routes/users';

const app = express();
app.use('/users', usersRouter);

describe('GET /users', () => {
  it('should return a list of users from fake API', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});