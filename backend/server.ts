import express, {Application, Request, Response, NextFunction} from 'express';
import wordRoutes from './routes/wordRoutes.js';
import dotenv from 'dotenv';
var cors = require('cors')

dotenv.config();


const app: Application = express();

app.use(cors());

app.use((req: Request,res: Response, next:NextFunction): void=>{
    console.log(req.path, req.method);
    next();
})

app.use('/api/words',wordRoutes)

app.get('/', (req: Request,res: Response): void=>{
    res.send('Hello TS ***');
})


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})