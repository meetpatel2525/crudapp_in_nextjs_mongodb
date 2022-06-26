import connectDb from "../../utils/connectdb";
import contect from "../../models/contectmodel";
import { IncomingForm } from "formidable";
import cloudinary from "cloudinary";
var mv = require("mv");
import fs from 'fs';

export const config = {
  //dor bodyparsers false
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// const data =  new Promise((resolve, reject) => {
// })
// in this id .js file we store all api backend data and we manage and update data  with databise from hear

export default async function handeler(req, res) {
  //for switch methods
  const {
    query: { id },
    method,
  } = req;

  await connectDb();

  //function that store the file of connection with databise

  //use swich method with multiple api call in one file
  switch (method) {
    //api for display data
    case "GET":
      try {
        const pet = await contect.findById(id); //contect is the name of my databise schima
        if (!pet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    //api for delete data

    case "DELETE" /* Delete a model by its ID */:

    //for delete image from folder 
let data = await contect.find({ _id: id })
console.log(data);
data.map((e) => {//e save all data of data 
  
  //for delete images from folder
  fs.unlinkSync("public/uploads/"+e.image);//path of images and e save all data so we neww only image so we write e.image
});
      try {

        const deletedPet = await contect.deleteOne({ _id: id }); //contect is the name of my databise schima
        console.log(deletedPet);
        if (!deletedPet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedPet});
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    //api for put data
    case "PUT" /* Edit a model by its ID */:
 console.log("edit call");
      const form = new IncomingForm();
      form.keepExtensions = true;
      // form.uploadDir =  `./public/uploads/${ Date.now() + '_'+ files.myFile.originalFilename}`;
        form.parse(req, (err, fields, files) => {
    const user = fields
    console.log(files);
    console.log(fields);
            if(files.myFile){
        var oldPath = files.myFile.filepath;
    //for create diffrent image nam,e and uplode the image on perticuler path
    var newPath = `./public/uploads/${
      Date.now() + "_" + files.myFile.originalFilename
    }`;
    //for create same file name as path
    let myfilename = Date.now() + "_" + files.myFile.originalFilename;
    mv(oldPath, newPath, function (err) {});
          //give the diffrent name to image save in db
          let image = myfilename;
          //fields store the new details of user  and this murch image and other details
          user.image = image;  
      }
//i dont whan to use promise so i use this async dumy function
         (async () => {   
          try {
            const pet = await contect.findByIdAndUpdate(id, user, {
              //contect is the name of my databise schima
              new: true,
              runValidators: true,
            });
            if (!pet) {
              return res.status(400).json({ success: false });
            }
            res.json(pet);
            res.status(200).json(" success"); 
      }catch (error) {
          res.status(400).json({ success: false });
        }
      })();
      }); 
        break;

        //for no case default 
    default:
      res.status(400).json({ success: false });
      break;
  }
}
