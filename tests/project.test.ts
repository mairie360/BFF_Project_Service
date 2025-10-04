import request from 'supertest';
import express from 'express';
import projectsRouter from '../src/routes/projects';

const app = express();
app.use('/projects', projectsRouter);

describe('Project BFF Endpoints', () => {

  /**
   * Test suite for GET /projects/:id
   * Ensures that fetching a single project by its ID returns the correct structure
   */
  describe('GET /projects/:id', () => {

    /**
     * Test: should return a single project by id
     * - Checks that the status is 200
     * - Validates that required properties exist: id, title, body, userId
     * - Ensures the id matches the requested id
     */
    it('should return a single project by id', async () => {
      const res = await request(app).get('/projects/1');

      if (res.status !== 200) {
        throw new Error(`Expected status 200 for GET /projects/1, got ${res.status}`);
      }

      const expectedProps = ['id', 'title', 'body', 'userId'];
      expectedProps.forEach(prop => {
        if (!(prop in res.body)) {
          throw new Error(`Missing property '${prop}' in project response: ${JSON.stringify(res.body)}`);
        }
      });

      if (res.body.id !== 1) {
        throw new Error(`Expected project id 1, got ${res.body.id}`);
      }
    });
  });

  /**
   * Test suite for GET /projects/user/:userId
   * Ensures that fetching projects filtered by userId works correctly
   */
  describe('GET /projects/user/:userId', () => {

    /**
     * Test: should return projects filtered by userId
     * - Checks that the status is 200
     * - Validates the response is an array
     * - Checks that the first project's userId matches the requested userId
     */
    it('should return projects filtered by userId', async () => {
      const userId = 1;
      const res = await request(app).get(`/projects/user/${userId}`);

      if (res.status !== 200) {
        throw new Error(`Expected status 200 for GET /projects/user/${userId}, got ${res.status}`);
      }

      if (!Array.isArray(res.body)) {
        throw new Error(`Expected response to be an array, got: ${JSON.stringify(res.body)}`);
      }

      if (res.body.length > 0 && res.body[0].userId !== userId) {
        throw new Error(`Expected first project userId to be ${userId}, got ${res.body[0].userId}`);
      }
    });

    /**
     * Test: should handle invalid userId gracefully
     * - Checks that the status is 200, 500, or 502 (depending on API response)
     * - Validates that error messages, if present, are strings
     */
    it('should handle invalid userId gracefully', async () => {
      const res = await request(app).get(`/projects/user/invalid`);

      if (![200, 500, 502].includes(res.status)) {
        throw new Error(`Expected status 200, 500, or 502 for invalid userId, got ${res.status}`);
      }

      if (res.body.error && typeof res.body.error !== 'string') {
        throw new Error(`Expected error message to be a string, got: ${JSON.stringify(res.body.error)}`);
      }
    });
  });

});
