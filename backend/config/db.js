import mongoose from "mongoose";

const connectDB =async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URL)
        console.log(`db connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("db error")
    }
}

export default connectDB