import mongoose from "mongoose";

//connection with databise of mongodb 
async function connectDb(){

try {
const MONGO_URL = "mongodb://localhost:27017/nextdb"
await mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
        useUnifiedTopology: true,
})
console.log("conected to mongodb");
} catch(error){
    console.log("its error");
console.log(error)
}
 }
 
export default  connectDb