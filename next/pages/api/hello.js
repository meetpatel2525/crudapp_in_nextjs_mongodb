
// this is demo api defolt bye the next js app

import connectdb from '../../utils/connectdb'

connectdb()

export default function handler(req,res){

res.status(200).json({name:"meet"})

}

