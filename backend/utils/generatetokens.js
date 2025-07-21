import jwt from 'jsonwebtoken'

 const generateTokenAndSetCookie = (userID,res) =>{


    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn:'15d'
    });

    res.cookie("jwt",token,{
        maxAge:15 * 24 * 60 * 60 * 1000, //15 days in miliseconds
        httpOnly: true, //prevent xss attacks
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development" 
    })

};

export default generateTokenAndSetCookie;