import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"


const app = express()
const upload = multer();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit:"10mb"}))
app.use(express.static("public"))

// Change the cookie of browser from server (CRUD operation)
app.use(cookieParser()); 


//routes imports
import userRouter from "./routes/user.routes.js"
import reportRouter from "./routes/report.routes.js"


//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/reports",reportRouter)

export {app}