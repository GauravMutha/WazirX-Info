const mongoose = require('mongoose')

const tickerSchema=new mongoose.Schema({
    name:{type:String},
    last:{type:String},
    buy:{type:String},
    sell:{type:String},
    volume:{type:String},
    base_unit:{type:String}
},{
    timestamps:true
})

const tickersCollection=mongoose.model('tickersCollection',tickerSchema)
async function prePopulateDB(){
    try{
        const count=await tickersCollection.countDocuments();
        if(count>0) return;
        for(let i=0;i<10;i++){
            const obj=new tickersCollection({
                name:"",
                last:"",
                buy:"",
                sell:"",
                volume:"",
                base_unit:"",
            })
            await obj.save();
        }
        console.log('Databse successfully pre-populated')
    }
    catch(error){
        console.log(error, 'Error in prepopulating of database')
    }
}
prePopulateDB()
module.exports={tickersCollection}