import express, {Application, Request, Response, NextFunction} from 'express';
import bagRoutes from './routes/bagRoutes.js';
import userRoutes from './routes/userRoutes.js';
import wordRoutes from './routes/wordRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();


const app: Application = express();

app.use(cors());
app.use(express.json());


app.use((req: Request,res: Response, next:NextFunction): void=>{
    console.log(req.path, req.method, req.body);
    next();
})
app.use('/api/user',userRoutes)
app.use('/api/bag',bagRoutes)
app.use('/api/word',wordRoutes)



const PORT = process.env.PORT

mongoose.connect((process.env.MONG_URI as string))
    .then(()=>{
        app.listen(PORT,()=>{
            console.log("connected to db and listening on port ", PORT);
        });
    })
    .catch((err)=>{console.log(err)})

