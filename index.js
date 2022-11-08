require("dotenv").config()
var express = require("express")
var request = require("request-promise")

var app = express()
var PORT = process.env.PORT || 5000
 
app.use(express.json())

var apiKey = process.env.API_KEY

var baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

var amazonURL = 'https://www.amazon.com/'

//Homepage
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/homepage.html")})

//Get amazon search result in json format
app.get("/amazon/search/:searchQuery", async (req, res)=>{
    var {searchQuery} = req.params;
    try{
        var response = await request(`${baseURL}&url=${amazonURL}s?k=${searchQuery}`)

        res.json(JSON.parse(response))
    } catch{
        res.send("Not found please check homepage for how to get apikey")
    }
})

//Get product details with ASIN in json format
app.get("/amazon/:productId", async (req, res)=>{
    var {productId} = req.params;
    try{
        var response = await request(`${baseURL}&url=${amazonURL}/dp/${productId}`)

        res.json(JSON.parse(response))
    } catch{
        res.send("Not found please check homepage for how to get apikey")
    }
})

//Get product reviews with ASIN in json format
app.get("/amazon/:productId/review", async (req, res)=>{
    var {productId} = req.params;
    try{
        var response = await request(`${baseURL}&url=${amazonURL}/product-review/${productId}`)

        res.json(JSON.parse(response))
    } catch{
        res.send("Not found please check homepage for how to get apikey")
    }
})

app.listen(PORT, ()=>{console.log(`Server running in PORT ${PORT}`)})
