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

describe('GET /users/:id', () => {
  it('should return a single user from fake API', async () => {
    const res = await request(app).get('/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should handle non-existing user gracefully', async () => {
    const res = await request(app).get('/users/9999');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'Failed to fetch user');
  });
});