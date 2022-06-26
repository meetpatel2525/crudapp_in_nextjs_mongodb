

// hear we display the data of blog using api with pagination 

// import nc from "next-connect"
import connectDb from "../../utils/connectdb";
import contect from "../../models/contectmodel";


const handeler = async (req,res)=>{


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
    console.log("page call");
    //hear we use some query 
    // console.log(req);
    let page = parseInt(req.query.page) || 1;
    console.log(req.query.limit);
    let pageSize = parseInt(req.query.limit) || 5;
    
    let skip = (page - 1) * pageSize;
    let total = await contect.countDocuments();
    
    let pages = Math.ceil(total / pageSize);
    let pros =  await contect.find().skip(skip).limit(pageSize);
    // console.log(pros);
    
    if(page > pages){
    
      return  res.status(404).json({
            status:"fail",
            message:"no page found"
        })
    }
    const result = await pros;
    
    // console.log(result);
    res.status(200).json({
      status : "sucess",
      count:result.length,
      page,
      pages,
      data:result,   
    });
    
    // res.json(user);
      }catch(error){
          res.json({message: error.message});
      }
      break;
    }
}

export default handeler

