import { Router } from 'express';
import axios from 'axios';
import { API_BASE_URL } from '../config/network';

const router = Router();


router.get('/', async (_, res) => {
  try {
    const users = await axios.get(`${API_BASE_URL}/users`);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`${API_BASE_URL}/users/${id}`);
    const user = await axios.get(`${API_BASE_URL}/users/${id}`);
    res.json(user.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
});

export default router;
