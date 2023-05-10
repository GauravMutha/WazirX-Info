const express=require('express')
const path = require('path')
const port=8000

const app=express()

app.use('/',require('./routes/index.js'))

app.listen(port,function(err){
    if(err) console.log(`Error in running the server : ${err}`)
    else console.log(`Server is up and running on port ${port}`)
})
