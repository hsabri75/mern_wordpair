import express from 'express';
import { getWords, createWord, createWords } from '../controllers/wordController'
import requireAuth from '../middleware/requireAuth';
const router = express.Router();

router.use(requireAuth);


router.get("/", getWords);
router.post("/", createWord);
router.post("/list", createWords);

export default router;