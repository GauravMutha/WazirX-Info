const mongoose = require('mongoose')

const tickerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    last:{type:String},
    buy:{type:String},
    sell:{type:String},
    volume:{type:String},
    base_unit:{type:String}
},{
    timestamps:true
})

const tickerCollection=mongoose.model('tickerCollection',tickerSchema)

module.exports={tickerCollection}