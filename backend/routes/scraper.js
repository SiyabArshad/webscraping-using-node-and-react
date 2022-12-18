const router=require("express").Router()
const {scarpedata}=require("../controllers/scraper")
router.post("/scrapedata",scarpedata)
module.exports=router