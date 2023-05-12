const axios=require('axios')
const {tickersCollection}=require('../model/tickers_collection')

const  fetchAndUpdate = async ()=> {
    const startTime=Date.now();
    let apiDataArray=[]
    try{
        const apiURL='https://api.wazirx.com/api/v2/tickers'
        const apiResponse=await axios.get(apiURL)
        const apiDataObject=apiResponse.data
        for(const key in apiDataObject){
            apiDataArray.push(apiDataObject[key])
            if(apiDataArray.length==10) break
        }
        const tickerDocs=await tickersCollection.find({});
        
        for(let i=0;i<apiDataArray.length;i++){
            const doc=tickerDocs[i]
            const {base_unit,last,volume,sell,buy,name}=apiDataArray[i]
            doc.name=name;
            doc.last=last;
            doc.buy=buy;
            doc.sell=sell;
            doc.volume=volume;
            doc.base_unit=base_unit;
            apiDataArray[i]=doc
            await doc.save()
        }
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log('database update successfully',duration)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }

}
fetchAndUpdate();
setInterval(fetchAndUpdate,30000)

module.exports.showHomePage=async (req,res)=> {
    try{
        const dataFromDB=await tickersCollection.find().exec();
        return res.render('home',{dataFromDB})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }
}

module.exports.updateAsPerTimer =async (req,res)=>{
    const dataFromDB=await tickersCollection.find().exec();
    return res.json(dataFromDB)
}



module.exports.showConnectPage=function(req,res){
    return res.send('Hello')
}