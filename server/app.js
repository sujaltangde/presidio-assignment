const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.env"})



app.use(express.json({ limit: '10mb' }));
app.use(cors({
	origin: "*",
	credentials: true
}))




// Routes Import
const user = require("./routes/userRoutes.js")
const property = require("./routes/propertiesRoutes.js")


app.use("/api/", user);
app.use("/api/", property);



// healthcheck
app.get("/api/test",(req,res)=>{
	res.send(
		"Everything Fine"
	)
})



module.exports = app;