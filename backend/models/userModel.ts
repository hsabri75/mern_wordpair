import mongoose from 'mongoose';
import bcrypt  from 'bcrypt';
import validator  from 'validator';
import IUser from './IUser';
const Schema = mongoose.Schema


  
  interface UserModel extends mongoose.Model<IUser> {
    login(email:string,password:string): any;
    signup(email:string,password:string): any;
  }

const userSchema = new Schema<IUser,UserModel>({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
});


userSchema.statics.login = async function(email:string,password:string) {
    if (!email || !password) {
        throw Error('All fields must be filled')
      }
    
      const user = await this.findOne({ email })
      if (!user) {
        throw Error('Incorrect email')
      }
    
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw Error('Incorrect password')
      }
    
      return user
    
}


userSchema.statics.signup = async function(email:string,password:string){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please enter a strong password')
    }
    const exist = await this.findOne({email})
    if(exist){
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = this.create({email,password:hash})
    return user

}

const User= mongoose.model<IUser,UserModel>('User',userSchema)

export default User