const mongoose = require("mongoose")
const all_users_Schema = require("../models/users")
const Allusersdb = mongoose.model('allusersdb' ,all_users_Schema);
 const BadRequestError=require('../errors/bad-request-error');
  


    const delete_user =  async (req, res)=>{

    const user_id = req.params.user_id;
    
    // if user does not enter user id as input
    if(!user_id)
    {throw new BadRequestError("User id must be provided")}


    // handel error if program_id is not ObjectId
    if(!mongoose.Types.ObjectId.isValid(user_id))
    {throw new BadRequestError("User id is not valid")}

    // check if user is exist to delete it
    const user_exist = await Allusersdb.findByIdAndDelete(user_id)
  
    //user is not exist
    if(!user_exist)
    {throw new BadRequestError("This user does not exist")}

     
 
    res.status(200).send("User was deleted successfully!")      

      
          
 
    };


    module.exports = {delete_user}

          