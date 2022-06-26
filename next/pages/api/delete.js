

//for delete single image 

import connectDb from "../../utils/connectdb";
import contect from "../../models/contectmodel";
import fs from 'fs';

const handeler = async (req,res)=>{
//for switch methods
  const {
    query: { id },
    method,
  } = req

//for connect with databise 
await connectDb();

switch (method){

  case 'POST':

    const img =req.body.image
    //for delete file or image from tha folder wher we are uploded user images 
    fs.unlinkSync("public/uploads/"+img);
    try{
        //this api is not working becose of image  not an array 
        const user = await contect.updateOne(
          {_id:req.body.id} ,
            {
                image:"null"
            }, 
        )
        //the try part is not working or no need till try end 
        res.json(user);
}catch(error){
  res.json({message: error.message});
}
  break;

  case "DELETE" /* Delete a model by its ID */:
console.log("multiple delete cal;l");
    console.log(req.body);
   //DELETE all selected  images from the  folder we delete from the front end and databaise  
   const users =  await contect.find({'_id':{'$in':req.body}});//STORE all selected data in users variable         
   
     console.log(users);
   
     users.map((e) => {                
    //for delete images from folder//for map only images we use e.image
           fs.unlinkSync("public/uploads/"+e.image);//path of images     
});
      try {

           //logic of delete multiple ids from databaise and from webpage // split(",") is use for covert string data in to aaray so we can delete full array at once
      const deletedone =   await contect.deleteMany({'_id':{'$in':req.body}});
      if (!deletedone) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
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

export default handeler
