import  mongoose  from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

// make model for mongodb databise and insert a data

const contectSchema = new mongoose.Schema({
    
    name:String,
    email: String,
    phone:String,
    password: String,
    image:Array,

},{
    //importent for switch model schimas 
    timestamps: true,
})
//autoIncrement is use for increment the id automatecly at browser and at databaise 
contectSchema.plugin(autoIncrement,"contect");

module.exports = mongoose.models.contect || mongoose.model('contect', contectSchema)
// export default   myContect;
