import express from 'express';
//import { WordPair } from '../models/WordPair';
import { getAllBags, createBag } from '../controllers/bagController';
import requireAuth from '../middleware/requireAuth';
const router = express.Router();

router.use(requireAuth);

router.get('/', getAllBags)

router.post("/", createBag);

export default router;