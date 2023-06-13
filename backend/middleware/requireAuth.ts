import  {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

type withID = {
    _id: string
  }

const requireAuth= async (req:Request,res:Response,next:NextFunction)=>{
    const {authorization} = req.headers  

    if(!authorization){
        res.status(401).json({error: 'Authorization token required'})
    }else{
        const token = authorization.split(" ")[1]
    try {
        
        const jwtres = await jwt.verify(token, (process.env.SECRET as string))
        if(typeof jwtres=='object')
            if('_id' in jwtres){
                const _id=jwtres._id
                const usr = await User.findOne({_id}).select('_id')
                if(typeof usr === 'object' && usr!==null && usr!==undefined){
                    req.user = {_id:_id}
                }                 
                next()
            }
        }  catch (error) {
        res.status(401).json({error: 'Request is not authorized'})
    }   

    }
    
    


}
 export default requireAuth