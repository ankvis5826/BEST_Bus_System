const mongoose = require('mongoose');
//this is for local host 'mongodb://127.0.0.1:27017/BESTBusInfo'
const url = 'mongodb+srv://ankit:2NjaUMWA6biRM6H7@cluster0.zgvpp.mongodb.net/BESTBusInfo?retryWrites=true&w=majority'
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   
}).then(()=>{
    console.log('Database Connected')
}).catch((e)=>{
      console.log('Database Connection Fail '+e);
});