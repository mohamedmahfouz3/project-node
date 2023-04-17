const express = require('express');
const mongoose = require("mongoose")
const all_users_Schema = require("../models/users")
const Allusersdb = mongoose.model('allusersdb' ,all_users_Schema);
const nodemailer = require("nodemailer")
const BadRequestError=require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
  

     

    const update_user =  async (req, res)=>{

    const user_id = req.params.user_id; 
    const { email} = req.body
    
    
  
    // if user does not enter user id
    if(!user_id)
    {throw new BadRequestError('User id must be provided')};
    

    // handel error if user_id is not ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id))
    {throw new BadRequestError("User id is not vaild")}


    // Fields must not be empty
    if(!req.body)
    {throw new BadRequestError("Fields must not be empty")}


    // Check if user is exist
    const user_exist = await Allusersdb.findById(user_id)

    // User is not exist
    if(!user_exist)
    {throw new NotFoundError()}


     const existingEmail = await Allusersdb.findOne(  {email} );

    // Email , Id must be unique 
    //if (existingId || existingEmail) {
    //throw new BadRequestError('There is user with the same data , please choose another id or email');
    //}

    

    // update data of user
    Allusersdb.findByIdAndUpdate(user_id ,  req.body    , { useFindAndModify: false})
         
    .then(data => {
        
    if(!data){
    throw new NotFoundError() }

    else{
        

     
    res.status(200).send("User updated ")


} })
        

    
    }


    module.exports = {update_user}