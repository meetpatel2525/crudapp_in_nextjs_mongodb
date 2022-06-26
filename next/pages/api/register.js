import connectDb from "../../utils/connectdb";
import register from "../../models/Registermodel";


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

        console.log("rehistration call");
        const { name,number,email,password} = req.body
  // console.log( name,number,email,password);
  register.findOne({email:email},(err, myregister) => {
            // console.log(myregister);
              if(myregister){
                console.log("if call");
                res.send({message: "User already registerd"});
              }else{
                  console.log("else call");
                  const userregist = new register({
                               name,
                              number,
                              email,
                              password
                  })  
                  console.log("save");                            
                  userregist.save(err => {
                      if(err) {
                        console.log("after save if");
                          res.json(err)
                      } else {
                        res.send( { message: "Successfully Registered, Please login now." })
                      console.log("after save else");
                        }
                  })
              }
          })
        break;
  
          //for no case default 
      default:
        res.status(400).json({ success: false });
        break;
    }
  }