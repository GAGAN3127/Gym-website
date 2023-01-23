const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    gender : {
        type:String,
        required:true
    },
    age : {
        type:Number,
        required:true
    },
    plan : {
        type:Number,
        required:true
    },
    payment_status: {
        type: Boolean,
        default: true
    },
    // ,
    // message : {
    //     type:String,
    //     required:true
    // }

   

})
   // create collection
   const Register = new mongoose.model("Register",userSchema);
   module.exports= Register;