import {Request, Response} from 'express';
import Word from '../models/wordModel';
import jwt from 'jsonwebtoken'
import { WordPair, BagList, BagWords } from '../types/types';
const mongoose = require("mongoose");

import Bag from "../models/bagModel";

const checkUser = async(res: Response, user?:jwt.JwtPayload):Promise<boolean>=>{
  if(!user){
    res.status(400).json({error:"User not logged in/ wordController"})
    return false
  }
  return true
}

const getBagsAndWords = async (req: Request, res: Response) => {  
  if(await checkUser(res,req.user)){
    console.log({user:req.user})
    const bags = await Bag.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    const bagList: BagList = [];
    let totalwordCount=0;
    for(let i=0;i<bags.length;++i){
      console.log({i, user:req.user, bag: bags[i].bagname})
      const words = await Word.find({ bag_id:bags[i]._id });      
      const wordList :WordPair[]=[]
      totalwordCount+=words.length
      for(let j=0;j<words.length;++j){
        const {first, second,_id} = words[j]    
        wordList.push({
          first,
          second,
          _id:_id.toString()
        })
      }
      bagList.push({
        bag_id:bags[i]._id.toString(),
        bagname:bags[i].bagname,
        words:wordList
      })
    }
    console.log(`${bags.length} bags, ${totalwordCount} words sent as response`)
    res.status(200).json(bagList);
  }
};

const createBag = async (req: Request, res:Response):Promise<void> => {
  if(await checkUser(res,req.user)){
    const { bagname } = req.body;
    console.log({creatBag_bagname:bagname})
    if (!bagname) {
      res.status(400).json({error:"Please fill the bag name"})
    }
    try {
      console.log({uid: req.user._id})
      const {_id} = await Bag.create({ bagname:bagname, user_id:req.user._id });
      const resBag:BagWords={bag_id:_id.toString(), bagname:bagname, words:[]}
      console.log({resBag})
      res.status(200).json(resBag)  
    } catch (error) {
      console.log({error})
      if(error instanceof Error){
        res.status(400).json({error:error.message})
      }else{
        res.status(400).json({error:"Uncaught error"})
      }        
    }
  }
};



const deleteBag = async (req: Request, res:Response) => {
  if(await checkUser(res,req.user)){    
    const { bag_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(bag_id)) {
      return res.status(404).json({ error: "Not valid id" });
    }
    const bag = await Bag.findByIdAndDelete(bag_id);
    if (!bag) {
      return res.status(404).json({ error: "Id not found" });
    }
    res.status(200).json(bag);
  }  
};

const deleteWord = async (req: Request, res:Response) => {
  if(await checkUser(res,req.user)){
    const { word_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(word_id)) {
      return res.status(404).json({ error: "Not valid id" });
    }
    const word = await Word.findByIdAndDelete(word_id);
    console.log({word})
    if (!word) {
      return res.status(404).json({ error: "Id not found" });
    }
    res.status(200).json(word);
  }
};

const checkBag =async (res:Response, bagWords:BagWords):Promise<boolean> => {
  let fillMsg= ""
  if (!bagWords.bagname) {
    fillMsg= fillMsg+"bag "
  }
  if(!bagWords.words){
    fillMsg= fillMsg+"wordlist "
  }
  if(fillMsg.length>0){
    res.status(400).json({ error: "Please fill the fields: "+fillMsg });
    return false;
  } 
  return true;
}


const createWords = async (req: Request, res:Response) => {
  const bagWords:BagWords = req.body;
  if(await checkBag(res,bagWords) && await checkUser(res,req.user)){

      const {bag_id}=bagWords;
      const ws = bagWords.words 
      const responseWords: WordPair[]=[];      
      for(let i=0;i<ws.length;i++){
        const {first, second}=ws[i]
        try {
          const word = await Word.create({first, second, bag_id});
          responseWords.push({first,second, _id:word._id.toString()})
        } catch (error) {
          const msg:{msg:string} = error instanceof Error ? {msg:error.message} : {msg:"uncaught error"}
          return res.status(400).send(msg)          
        }
      }
      const bagwords:BagWords={bag_id, bagname:bagWords.bagname, words:responseWords}
      res.status(200).json({msg:bagwords})
    }
};


const _deleteAllWords = async () => {  
const res = await Word.find({__v:0});
for (let i=0;i<res.length;i++){
  console.log(res[i])
  await Word.findByIdAndDelete(res[i]._id)
}

};


export {  getBagsAndWords, createBag, deleteBag, createWords, deleteWord  };
