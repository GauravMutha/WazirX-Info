const express=require('express')
const ejs =require('ejs')
const path = require('path')
require('dotenv').config()
const db=require('./config/mongoose')
const port=8000

const app=express()

app.use('/',require('./routes/index.js'))
app.set('view engine','ejs')
app.use(express.static('./assets'));
app.use('/public', express.static(__dirname + '/public'));
app.listen(port,function(err){
    if(err) console.log(`Error in running the server : ${err}`)
    else console.log(`Server is up and running on port ${port}`)
})
