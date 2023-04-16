const mongoose = require("mongoose")
const all_users_Schema = require("../models/users")
const Allusersdb = mongoose.model('allusersdb' ,all_users_Schema);
const BadRequestError=require('../errors/bad-request-error');

    
    const get_user = async (req, res)=>{
        
    const user_id = req.params.user_id

    // if user id is missed
    if(!user_id)
    {throw new BadRequestError("user id should be provided") }


      
    // handel error if course_id is not ObjectId
    if(!mongoose.Types.ObjectId.isValid(user_id))
    {throw new BadRequestError("User id is not valid")}
 
    // check is user does not exist
    const is_exist = await Allusersdb.findById(user_id ) 
    if (!is_exist)  {throw new BadRequestError("This user does not exist")}
    
    
    // show the user     
     res.status(200).send(is_exist) 
                    
                
     
                
        
        }


    module.exports = { get_user }
    
       
   