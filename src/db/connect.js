const mongoose=require("mongoose")

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://debanjan:debanjan@cluster0.oilnaff.mongodb.net/excel")
.then(()=>{
    console.log("db connect")
}).catch((err)=>console.log(err))