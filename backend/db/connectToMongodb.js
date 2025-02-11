import mongoose from "mongoose";
const connectToMongoDB = async () => {
    try {
    
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connect to mongodb")
    } catch (error) {
        console.log("Error connecting to MongoDb",error.message)
    }
}

export default connectToMongoDB