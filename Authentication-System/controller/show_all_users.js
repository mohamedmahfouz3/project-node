const mongoose = require("mongoose")
const all_users_Schema = require("../models/users")
const Allusersdb = mongoose.model('allusersdb' ,all_users_Schema);
const BadRequestError=require('../errors/bad-request-error');



    const get_all_users = async (req, res)=>{

     // Check if there are courses to display them
     const exist_users= await Allusersdb.findOne({}, {"name" : 1})

     // when there are no courses
     if (!exist_users)
     {throw new BadRequestError("There is no users")}
 
    const user = await Allusersdb.find({}, {"name" : 1})
        
    res.send(user) 

           
    }

    module.exports = { get_all_users }
