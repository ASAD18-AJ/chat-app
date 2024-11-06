import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectToMongodb from './db/connectToMongodb.js'

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


app.get('/',(req,res) => {
    res.send("Hello world!!");
})

app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    connectToMongodb()
    console.log(`Server Running on Port ${PORT}`)
})  