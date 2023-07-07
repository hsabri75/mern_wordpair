import express from 'express';
//import { WordPair } from '../models/WordPair';
import { _getBags, getBagsAndWords, createBag, deleteBag } from '../controllers/wordController';
import requireAuth from '../middleware/requireAuth';
const router = express.Router();

router.use(requireAuth);

router.get('/', getBagsAndWords)

router.post("/", createBag);

router.delete("/", deleteBag )

export default router;