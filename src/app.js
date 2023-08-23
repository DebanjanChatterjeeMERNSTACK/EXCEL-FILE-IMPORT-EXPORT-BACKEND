const express = require("express")
const app = express()
require("./db/connect");
const cors = require("cors")
const excel = require("./route/route")


const port = process.env.PORT || 8000;
app.use(express.json())
app.use(cors())




app.use("/upload", express.static("src/upload"))

app.use(excel)



app.listen(port, () => {
    console.log("server connected")
})
