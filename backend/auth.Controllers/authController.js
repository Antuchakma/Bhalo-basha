import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { minpasslength } from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generatetokens.js";


export const Signup = async (req,res)=>
{
        try {

            const {fullname, username, password, confirmpassword, role} = req.body;
            if(password!==confirmpassword)
            {
                return res.status(400).json({error:"password do not match"});
            }

            if(password.length<minpasslength){
                return res.status(400).json({error:"minimum password length is 6"});
            }

            const user = await User.findOne({username});

            if(user){
                return res.status(400).json({error:"User name already exists"});
            }

            //hash password here

            const salt = await bcrypt.genSalt(10);
             const hashedpassword = await bcrypt.hash(password,salt);


            //https://avatar-placeholder.iran.liara.run/
           // https://avatar.iran.liara.run/public/boy
           //https://avatar.iran.liara.run/public/boy?username=Scott

           const ProfilePic =`https://picsum.photos/120`


           const newUser = new User({
            fullname,
            username,
            password:hashedpassword,
            role,
            profilepic:ProfilePic

           })

           if(newUser)
           {

            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();


           res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilepic:newUser.profilepic

           });
           }

           else{
            return res.status(400).json({error:"invalid user data"});
           }

           console.log("profile created successfully");

        } catch (error) {
            
            console.log("error in Signup controller");
            res.status(500).json({error:"Internal server error"});
        }
}

export const Login = async (req,res) =>
{
    try {

        const { username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect  = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect)
        {
            res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(201).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic

           });

        
    } catch (error) {
        
        console.log("error in LOGIN controller");
        res.status(500).json({error:"internal server error"});

    }
}

export const Logout=  async (req,res)=>
{
    try {

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
        
    } catch (error) {
        
        console.log("error in logout controller");
        res.status(500).json({error:"internal server error"});

    }
}