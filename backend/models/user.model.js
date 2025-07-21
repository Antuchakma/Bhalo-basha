import { Schema } from "mongoose";
import mongoose from "mongoose";

export const minpasslength = 6;

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required: true,  
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        minlength:minpasslength
    },
    role:{

        type:String,
        required: true,
        enum:["owner","renter"]
    },
    profilepic:{
        type:String,
        default:""
    }
},{
    timestamps: true
});

const User = mongoose.model("User",userSchema);

export default User;

