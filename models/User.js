const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        trim :true ,
    },
    lastName :{
        type: String,
        required:true,
        trim :true,

    },
    email: {
         type:String,
         required: true ,
         trim : true, //ensures that leading and trailing spaces are removed from input values.

    },
    password:{
        type:String ,
        required: true,
    },
    accountType:{
        type:String ,
        enum :["Admin","Student","Instructor"], //accountType uses an enum to restrict values to specific roles (Admin, Student, Instructor), enforcing controlled input.

        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required :true,
        ref:"Profile", //additionalDetails is a reference to a Profile schema, which likely contains more detailed user information.

    },
    courses: [{
        //courses is an array of references to a Course schema, representing the courses a user is enrolled in or managing.
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    image:{
        type:String,
        required:true,

    },
    token:{
        type : String,
        required : true,
    },
    resetPasswordExpires:{
        type:Date,
    },
    
    courseProgress:[{
        //courseProgress tracks the progress of the user in courses via references to the CourseProgress schema.
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
    }],



});
module.exports = mongoose.model("User", userSchema);