import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userCollection = "users"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }


});

userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, bcrypt.genSaltSync(password, this.password))
}
export default mongoose.model(userCollection, userSchema);