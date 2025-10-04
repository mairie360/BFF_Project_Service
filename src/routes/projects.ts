import { Router } from 'express';
import axios from 'axios';
import { API_BASE_URL } from '../config/network';
import { Request, Response } from 'express';

const router = Router();

/**
 * Helper to handle API requests and errors uniformly
 */
/**
 * Handles an API request by executing the provided asynchronous API call function,
 * sending the result as a JSON response, and managing errors with appropriate HTTP status codes.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param apiCall - A function that returns a Promise resolving to the API response data.
 *
 * @remarks
 * - If the API call succeeds, the response is sent as JSON.
 * - If the API call fails with a response from the upstream API, the error status and data are forwarded.
 * - If there is no response from the upstream API, a 502 Bad Gateway error is sent.
 * - For other errors, a 500 Internal Server Error is sent.
 */

/**
 * Handle API requests with uniform error handling.
 * @param req - Express request object
 * @param res - Express response object
 * @param apiCall - Function returning a Promise with API data
 */
async function handleApiRequest<T>(
  req: Request,
  res: Response,
  apiCall: () => Promise<T>
): Promise<void> {
  try {
    const data = await apiCall();
    res.json(data);
  } catch (error: unknown) {
    console.error('API request error:', (error as Error).message);

    const err = error as {
      response?: { status: number; data?: unknown };
      request?: unknown;
      message?: string;
    };

    if (err.response) {
      res.status(err.response.status).json({
        error: err.response.data || err.message,
      });
    } else if (err.request) {
      res.status(502).json({ error: 'No response from upstream API' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}



/**
 * @route GET /projects/:id
 * @description Get a project by its ID.
 * @param req - Express request object, expects :id as a route parameter.
 * @param res - Express response object.
 * @returns The project data as JSON.
 */
router.get('/:id', (req, res) =>
  handleApiRequest(req, res, () => axios.get(`${API_BASE_URL}/posts/${req.params.id}`).then(r => r.data))
);

/**
 * @route GET /projects/user/:userId
 * @description Get all projects for a specific user.
 * @param req - Express request object, expects :userId as a route parameter.
 * @param res - Express response object.
 * @returns An array of projects for the user as JSON.
 */

//Do we let this call here or in the user/core BFF?
router.get('/user/:userId', (req, res) =>
  handleApiRequest(req, res, () =>
    axios.get(`${API_BASE_URL}/posts`, { params: { userId: req.params.userId } }).then(r => r.data)
  )
);

export default router;
