import  mongoose  from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

// make model for mongodb databise and insert a data

const registerSchema = new mongoose.Schema({
    
    name:String,
    email:String,
    number:String,
    password: String,
    reEnterPassword:String,

},{
    //importent for switch model schimas 
    timestamps: true,
})
//autoIncrement is use for increment the id automatecly at browser and at databaise 
registerSchema.plugin(autoIncrement,"register");

module.exports = mongoose.models.register || mongoose.model('register', registerSchema)

