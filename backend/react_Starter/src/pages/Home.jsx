import * as React from 'react'
import Navbar from '../components/Navbar'
import "../stylesheets/home.scss"
import { TextField,Button,Typography,Chip,Box,CircularProgress,LinearProgress } from '@mui/material'
import axios from "axios"
export default function Home() {
    const[inpdata,setinpdata]=React.useState("")
    const[load,setload]=React.useState(false)
    const[datainfo,setdatainfo]=React.useState(null)
    const[message,setmessage]=React.useState("")
const scraping=async()=>{
setload(true)
    try{
    const{data}=await axios.post("http://localhost:5000/ppik/scrapedata",{uniurl:inpdata})
    setdatainfo(data?.data)
    setmessage(data?.message)
    setload(false)
}
catch(e){
    setload(false)
    setmessage(e.message)
}
}
  return (
    <div>
        <Navbar/>
       {
        load?
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    :
<>
        <div className='inpcont'>
        <TextField
  label="Enter Url"
  id="filled-hidden-label-small"
  defaultValue=""
  variant="filled"
  fullWidth
  onChange={(e)=>setinpdata(e.target.value)}
/>
<Button onClick={scraping} sx={{my:"10px"}} variant="contained">Genereate data</Button>
        </div>
        {
            datainfo!==null||undefined?
            <div className='outputcomp'>
                <Typography variant='h4' fontWeight="bold">{datainfo?.name}</Typography>
                <Typography variant='h5' >{datainfo?.title}</Typography>
                <Typography color="primary" variant='h5' fontWeight="bold">Programs</Typography>
                <div className='programs'>
                {
                    datainfo?.programs.map((item,i)=>{
                        return(
                            <Chip sx={{m:1}} label={item} variant="outlined" />
                        )
                    })
                }
                </div>
                <Typography color="red" variant='h5' fontWeight="bold">{datainfo?.lastdate}</Typography>
                <img className='posterpic' src={datainfo?.poster} alt="uniposter">
                </img>
                <div>
                <Button sx={{my:"10px"}} variant="contained">Store</Button>        
        </div>
        </div>
        :null
        }
        </>
}
  </div>
  )
}
