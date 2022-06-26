import connectDb from "../../utils/connectdb";
import contect from "../../models/contectmodel";


//search backend api 

export default async function handeler(req, res) {
  //for switch methods
  const {
    query: { id },
    method,
  } = req;

  await connectDb();

  //use swich method with multiple api call in one file
  switch (method) {
    //api for display data
    case "GET":
console.log("its meet search");

        //for get the query search by user
        const mydata =  req.query.searchuser
    
        try{
            const name = new RegExp(mydata,'i');//this is for we serch meet or Meet or MEET all are same 
           const user = await contect.find({name})//it faind the data acording to name of user   
        console.log(user);
           res.json(user);//we store the responce in data so in frontend use data.data for responce 
           }catch(error){    
        res.status(400).json({ success: false });
      }
      break;
    
        //for no case default 
    default:
      res.status(400).json({ success: false });
      break;
  }
}
