const PORT = 5000;
const cors=require("cors")
const express = require('express');
const app = express();
const scarpe=require("./routes/scraper")
app.use(express.json())
app.use(cors())
app.use("/ppik/",scarpe)
app.listen(PORT, () => console.log(`server running on port ${PORT}`));