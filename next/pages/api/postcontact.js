


// post API of add data of contect form in store in the json file 

// import * as fs from 'fs';
// export default async function  handler(req, res) {
//     if (req.method === 'POST') {

//       // Process a POST request 

//       let data = await fs.promises.readdir('contactdata');//when add the data it add the the data in  contactdata file
//       fs.promises.writeFile(`contactdata/${data.length+1}.json`, JSON.stringify(req.body))
//       res.status(200).json(req)
//     } else { 
//       res.status(200).json(["allBlogs"]) 
//     }
//   }


// export default handeler


// //for store data in databise 
// import nc from "next-connect"
import connectDb from "../../utils/connectdb";
import contect from "../../models/contectmodel";
import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv');
//for connect with databise 
connectDb();

export const config = {

//dor bodyparsers false
  api: {
    bodyParser: false,
  },
};

const handeler = async (req,res)=>{
//for switch methods
  const {
    query: { id },
    method,
  } = req

switch (method){

  case 'POST':

    try{

//use formitable for uplode image in folder and display 
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm()
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        var oldPath = files.myFile.filepath;
        //for create diffrent image nam,e and uplode the image on perticuler path 
        var newPath = `./public/uploads/${ Date.now() + '_'+ files.myFile.originalFilename}`;
        //give the diffrent name to image save in db
       let  myfilename =  Date.now() + '_'+ files.myFile.originalFilename 
        mv(oldPath,newPath, function(err) {});

  let image = myfilename;

  //fields store the new details of user  and this murch image and other details 
  fields.image=image;
  
  const newUser = new contect(fields);

//save detail in db 
      newUser.save();
      res.json(newUser);  
});
})

}catch(error){
  res.json({message: error.message});
}
}
}

export default handeler


