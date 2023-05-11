const axios=require('axios')
const {tickersCollection}=require('../model/tickers_collection')

module.exports.showHomePage=async (req,res) => {
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

            await doc.save()
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }
}