import express from 'express';
//import { WordPair } from '../models/WordPair';
import { getBags, createBag } from '../controllers/wordController';
import requireAuth from '../middleware/requireAuth';
const router = express.Router();

router.use(requireAuth);

router.get('/', getBags)

router.post("/", createBag);

export default router;