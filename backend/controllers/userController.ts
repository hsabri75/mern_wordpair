import express, {Request, Response} from 'express';
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const createToken = (_id:string)=>{
    const secret:string = (process.env.SECRET as string)    
    return jwt.sign({_id}, secret, {expiresIn:'3d'} )
}


const loginUser= async (req: Request,res: Response)=>{
    const {email, password}= req.body
    console.log({bd: req.body})
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        if(error instanceof Error){
            console.log("em:  ---",error.message)
            res.status(400).json({error:error.message})
        }else{
            console.log("uncaught error ", error)
            res.status(400).json({error:"uncaught error "})
        }        
    }
}

const signupUser= async (req:Request,res:Response)=>{
    const {email, password}= req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error:error.message})
        }else{
            console.log("uncaught error ", error)
        } 
    }

}

export {loginUser,signupUser}