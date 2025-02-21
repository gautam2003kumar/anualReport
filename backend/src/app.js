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

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(upload.none());

// Change the cookie of browser from server (CRUD operation)
app.use(cookieParser())


//routes imports
import userRouter from "./routes/user.routes.js"



//routes declaration
app.use("/api/v1/users",userRouter)

export {app}