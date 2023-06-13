import express, {Request, Response} from 'express';
import Bag from "../models/bagModel";


// get all wo
const getAllBags = async (req: Request, res: Response) => {
  if(req.user){
    const user_id = req.user._id;
    const bags = await Bag.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(bags);
  }else{
    res.status(400).json({error:"User not logged in/ wordController"})
  }
  
};

const createBag = async (req: Request, res:Response) => {
  const { bagname } = req.body;
  if (!bagname) {
    return res.status(400).json({ error: "Please fill the bag name" });
  }
  try {
    if(req.user){
      console.log({ req_user: req.user._id });
      const user_id = req.user._id;
      console.log({bagname, user_id})
      const bag = await Bag.create({ bag:bagname, user_id });
      res.status(200).json(bag);
    }else{
      res.status(400).json({error:"User not logged in/ wordController"})
    }
  } catch (error) {
    if(error instanceof Error){
      console.log("err1")
      res.status(400).json({error:error.message})
  }else{
      console.log("uncaught error ", error)
  }   
  }
};

export { getAllBags, createBag };
