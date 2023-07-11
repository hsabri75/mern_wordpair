import mongoose from 'mongoose';
const Schema = mongoose.Schema

const bagSchema = new Schema({
    bagname:{
        type: String,
        required:true,    
    },
    user_id:{
        type: String,
        required:true,
    },

});
bagSchema.index({ bagname: 1, user_id: 1 }, { unique: true })


export default mongoose.model('Bag',bagSchema)