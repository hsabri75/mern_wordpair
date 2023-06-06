import express, {Application, Request, Response} from 'express';
const router = express.Router();

export default router.get('/', async (req: Request,res: Response)=>{
    //res.send("words list")
    type WordPair = {
        first: string,
        second: string
    }
    let words: WordPair[]=[];
    words.push({first:"France",second:"Paris"});
    words.push({first:"England",second:"London"});
    words.push({first:"Italy",second:"Rome"});
    console.log(words);
    res.status(200).json(JSON.stringify(words));
})

