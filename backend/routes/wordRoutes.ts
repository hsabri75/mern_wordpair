import express from 'express';
import { createWords, deleteWord } from '../controllers/wordController'
import requireAuth from '../middleware/requireAuth';
const router = express.Router();

router.use(requireAuth);

router.delete("/", deleteWord);
router.post("/", createWords);

export default router;