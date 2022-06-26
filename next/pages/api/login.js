import connectDb from "../../utils/connectdb";
import register from "../../models/Registermodel";
var jwt = require('jsonwebtoken');
export default async function handeler(req, res) {
  //for switch methods
  const {
    query: { id },
    method,
  } = req;

  await connectDb();

  //use swich method with multiple api call in one file
  switch (method) {

    //api for registration
    case "POST" /*POST registration*/:
      console.log("login api call");
      //get email and password
      const { email, password } = req.body;
      register.findOne({ email: email }, (err, login) => {
        // console.log(login);
        if (login) {
          //chek password is curect as user databise and than send the message in front end for popup mesaage
          if (password === login.password) {
           //set jwt token
            var token = jwt.sign({email:login.email,name:login.name,number:login.number}, 'jwttokan');
           console.log({token});
            res.send({ message: "Login Successfull", data:token, status: 'authenticated'});
            res.status(200).json({  status: 'authenticated',token });
          } else {
            res.send({ message: "Password didn't match" });
          }
        } else {
          res.send({ message: "User not registered" });
        }
        res.status(400).json({ status: 'unauthenticated'});
      });

      break;

    //for no case default
    default:
      res.status(400).json({ success: false });
      break;
  }
}
