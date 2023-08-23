const mongoose=require("mongoose")


const excelschema=new mongoose.Schema({
    Name:String,
    Address:String,
    PhoneNumber:String,
    Salary:String

})
const Excelschema=new mongoose.model("excel",excelschema)
module.exports=Excelschema