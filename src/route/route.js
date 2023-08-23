const express = require("express")
const route = express.Router()
const multer = require("multer")
const path = require("path")
const readXlsxFile = require('read-excel-file/node')
const excel = require("../model/excelmodel")
const exceljs = require("exceljs")

const storage = multer.diskStorage({
    destination: 'src/upload',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },

})

const upload = multer({ storage: storage })



route.post("/excel", upload.single("file"), (req, res) => {

    const excel1 = []

    readXlsxFile(req.file.path).then(async (rows) => {

        for (let x = 1; x < rows.length; x++) {
            excel1.push({
                Name: rows[x][1],
                Address: rows[x][2],
                PhoneNumber: rows[x][3],
                Salary: rows[x][4]
            })

        }
        await excel.insertMany(excel1)
        res.send({ mess: "file upload complete" })

    })


})


route.get("/getexcel", async (req, res) => {

    const excelread = await excel.find()
    res.send({ user: excelread })

})

route.get("/exportexcel", async (req, res) => {

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("salarysheet")

    worksheet.columns = [
        {
            header: "Name",
            key: "Name"
        },
        {
            header: "Address",
            key: "Address"
        },
        {
            header: "PhoneNumber",
            key: "PhoneNumber"
        },
        {
            header: "Salary",
            key: "Salary"
        }
    ]
    const excelread = await excel.find()

    excelread.forEach((e) => {
     
        worksheet.addRow(e)

    })
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true }
    })
   


    // const fileName = 'FileName.xlsx';
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    return workbook.xlsx.write(res).then((e)=>{
    res.status(200)

    })
})



// route.get("/search/:id", async(req, res) => {
//     const name = req.params["id"]

//      name or address

//     const user =await excel.find({ $or: [{ Name: { $regex: ".*" + name + ".*", $options:"i" }}, {Address: { $regex: ".*" + name + ".*", $options: "i" } }] })
//     res.send(user)
// })

// route.get("/sort/:id",async(req,res)=>{
//     const sorted=req.params["id"]

//    id only send 1 or -1

//     const sort=await excel.find({}).sort({Name:sorted})
//     res.send(sort)
// })

// route.get("/pagination",async(req,res)=>{
//    const skip=req.query.skip
//    const limit= req.query.limit

//    skip or limit only used pagination

//    const page=await excel.find({}).skip(skip).limit(limit)
//    res.send(page)
// })


module.exports = route