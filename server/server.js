require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
// const { default: mongoose } = require("mongoose")

const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const app = express()
const PORT = process.env.PORT || 5220

connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.json("Home")
})

app.use("/api/tasks", require("./routes/taskRoute"))
app.use("/api/users", require("./routes/userRoute"))
app.use("/api/posts", require("./routes/postRoute"))
app.use("/api/photos", require("./routes/photoRoute"))



mongoose.connection.once('open', () => {
    console.log('connected to MOngoDB')
    app.listen(PORT, () => {
        console.log(`server running at port ${PORT}`);
    })
})

mongoose.connection.on('error', () => {
    console.log(err);
})
