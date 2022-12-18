const axios = require('axios');
const cheerio = require('cheerio');
const scarpedata=async(req,res)=>{
console.log(req.body.uniurl)
    try {
    let programsoffered=[]
    const urlin=`${req.body.uniurl}`
    const {data}=await axios.get(urlin, { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });
    const $=cheerio.load(data)
    const titleinfo=$(".page-title h1").text()//geting name of university
    const poster=$(".post_thumb a img").attr("src")
    const lastdateapply=$(".post_content h3").filter((i,it)=>i===0).text()
    const programsinfo=$(".sc_list li a").each((index,item)=>{
      programsoffered.push($(item).text())
    })
    const uniname=$(".odd p a").text()
    let admisiondetails={
      name:uniname,
      title:titleinfo,  
      programs:programsoffered,
      lastdate:lastdateapply,
      poster:poster
  }
  res.status(200).json({
    message:"Data scrapped",
    data:admisiondetails
  })
  }
  catch(e)
  {
    res.status(500).json({
        message:"Failed to scrap"
        ,logicalerror:e.message
      })
  }
}
module.exports={scarpedata}