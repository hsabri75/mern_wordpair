import mongoose from 'mongoose';
const Schema = mongoose.Schema

const wordSchema = new Schema({
    first:{
        type: String,
        required:true,  
    },
    second:{
        type: String,
        required:true,
    },
    bag_id:{
        type: String,
        required: true,
    },
});
wordSchema.index({ first: 1, bag_id: 1 }, { unique: true })
wordSchema.index({ second: 1, bag_id: 1 }, { unique: true })


export default mongoose.model('Word',wordSchema)