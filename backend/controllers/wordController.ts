import express, {Request, Response} from 'express';
import Word from '../models/wordModel';

const getWords = async (req: Request, res: Response) => {
  const { bag_id } = req.body;
  if(req.user){
    const words = await Word.find({ bag_id });
    res.status(200).json(words);
  }else{
    res.status(400).json({error:"User not logged in/ wordController"})
  }
  
};

const createWord = async (req: Request, res:Response) => {
  const { bag_id, first, second } = req.body;
  let fillMsg= ""
  if (!bag_id) {
    fillMsg= fillMsg+"bag "
  }
  if(!first){
    fillMsg= fillMsg+"first "
  }
  if(!second){
    fillMsg= fillMsg+"second "
  }
  if(fillMsg!==""){
    return res.status(400).json({ error: "Please fill the fields: "+fillMsg });
  } 

  try {
    if(req.user){
      const word = await Word.create({first, second, bag_id});
      res.status(200).json(word);
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

export { getWords, createWord };
