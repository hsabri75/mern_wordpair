import express, {Request, Response} from 'express';
import Word from '../models/wordModel';
import jwt from 'jsonwebtoken'


import Bag from "../models/bagModel";


// get all wo
const getBags = async (req: Request, res: Response) => {
  if(req.user){
    const user_id = req.user._id;
    const bags = await Bag.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(bags);
  }else{
    res.status(400).json({error:"User not logged in/ wordController"})
  }  
};

const _createBagFunction = async(bagname:string, user?:jwt.JwtPayload):Promise<{ status: number; msg: string; }>=>{
  if (!bagname) {
    return {status:400, msg:"Please fill the bag name"}
    //return res.status(400).json({ error: "Please fill the bag name" });
  }
  try {
    if(user){
      const user_id = user._id;
      const bag = await Bag.create({ bag:bagname, user_id });
      return {status:200, msg:bag._id.toString()}
      //res.status(200).json(bag);
    }else{
      return {status:400, msg:"User not logged in/ wordController"}
      //res.status(400).json({error:"User not logged in/ wordController"})
    }
  } catch (error) {
    if(error instanceof Error){
      return {status:400, msg:error.message}
      //res.status(400).json({error:error.message})
  }else{
      //console.log("uncaught error ", error)
      return {status:400, msg:"Uncaught error"}
  }   
  }
}

const createBag = async (req: Request, res:Response) => {
  const { bagname } = req.body;
  const {status,msg}=await _createBagFunction(bagname, req.user)
  res.status(status).json(msg);
};

const getWords = async (req: Request, res: Response) => {
  const { bag_id } = req.body;
  if(req.user){
    const words = await Word.find({ bag_id });
    res.status(200).json(words);
  }else{
    res.status(400).json({error:"User not logged in/ wordController"})
  }  
};

const createWords = async (req: Request, res:Response) => {
  const { bagname, wordlist, columnSeperator, rowSeperator } = req.body;
  let fillMsg= ""
  if (!bagname) {
    fillMsg= fillMsg+"bag "
  }
  if(!wordlist){
    fillMsg= fillMsg+"wordlist "
  }
  const cSep= columnSeperator ? columnSeperator : "\t";
  const cRow= rowSeperator ? rowSeperator : "\n";

  if(fillMsg!==""){
    return res.status(400).json({ error: "Please fill the fields: "+fillMsg });
  }    

  try {
    if(req.user){
      const {status:stBag, msg: msgBag}= await _createBagFunction(bagname,req.user)
      if(stBag===200){
        const bag_id=msgBag;
        const ws = (wordlist as string).split(rowSeperator)
        for(let i=0;i<ws.length;i++){
          console.log({wi:ws[i]})
          const spl= ws[i].split(columnSeperator)
          const first= spl[0];
          const second= spl[1];
          console.log({f:first,s:second})
          const {status:stWord,msg:msgWord}=await _createWordFunction(bag_id, first, second, req.user)
          console.log({stWord,msgWord})
          if(stWord===400){
            res.status(stWord).json(msgWord)
          }
        }
      }else{
        res.status(stBag).json(msgBag)
      }
      console.log("all finished")
      res.status(200).json({msg:bagname})
    }else{
      res.status(400).json({error:"User not logged in/ wordController"})
    }
  } catch (error) {
    if(error instanceof Error){
      //console.log("err1")
      res.status(400).json({error:error.message})
  }else{
      console.log("uncaught error ", error)
  }   
  }
};

const _createWordFunction = async(bag_id:string, first:string, second:string, user?:jwt.JwtPayload):Promise<{ status: number; msg: string; }>=>{
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
    return {status:400, msg:"Please fill the fields: "+fillMsg}
    //return res.status(400).json({ error: "Please fill the fields: "+fillMsg });
  } 

  try {
    if(user){
      const word = await Word.create({first, second, bag_id});
      return {status:200, msg:word._id.toString()}
      //res.status(200).json(word);
    }else{
      return {status:400, msg:"User not logged in/ wordController"}
      //res.status(400).json({error:"User not logged in/ wordController"})
    }
  } catch (error) {
    if(error instanceof Error){
      console.log("err1")
      return {status:400, msg:error.message}
      //res.status(400).json({error:error.message})
  }else{
      console.log("uncaught error ", error)
      return {status:400, msg:"uncaught error"}
  }   
  }

}

const createWord = async (req: Request, res:Response) => {
  const { bag_id, first, second } = req.body;
  const {status,msg}=await _createWordFunction(bag_id, first, second, req.user)
  res.status(status).json(msg)
};

export { getBags, createBag, getWords, createWord, createWords };
