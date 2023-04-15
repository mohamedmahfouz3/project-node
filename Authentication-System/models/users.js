const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


const all_users_Schema = mongoose.Schema({
    name: { type :String, required: true },
    email: { type : String, required: true },
    password: { type :String, required: true },
 
  });
   
 
  all_users_Schema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  

module.exports = all_users_Schema;
