import mongoose from "mongoose"


//username="chakma2107121"
//user password ="CO4o9PBVnfJgPKnx"
//mongodb+srv://chakma2107121:aCUwiaoieEYB8T8r@cluster0.b6j07nh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

export const connectDB = async() => {

    try {

         await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected Successfully");

    } catch (error) {
        

        console.error("error connecting database",error);
        process.exit(1);

    }
    
} 