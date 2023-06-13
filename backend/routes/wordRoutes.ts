import express from 'express';
import { getWords, createWord } from '../controllers/wordController'
import requireAuth from '../middleware/requireAuth';
const router = express.Router();

router.use(requireAuth);


router.get("/", getWords);
router.post("/", createWord);

export default router;