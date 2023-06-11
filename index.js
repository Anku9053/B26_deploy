const express= require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/notes.routes")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to the db")
        console.log(`running in the port ${process.env.port}`)
    } catch (error) {
        console.log(error)
        console.log("something went wrong")
    }
    
})