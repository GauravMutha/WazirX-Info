const mongoose=require('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URL,{
    useNewURLParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection

db.on('error',console.error.bind(console,'Error connecting to the database'))

db.once('open',function(){
    console.log('Server successfully connected to the database');
})

module.exports=db;