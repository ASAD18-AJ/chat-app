import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongodb from './db/connectToMongodb.js'

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON request bodies(to parse the incoming requests with JSON payloads (from req.body))
app.use(cookieParser()); // Middleware to parse cookies


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes)


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
// app.get('/',(req,res) => {
//     res.send("Hello world!!");
// })

app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    connectToMongodb()
    console.log(`Server Running on Port ${PORT}`)
})  