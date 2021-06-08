const mongoose=require('mongoose');
//making connection to DB in atlas
mongoose.connect('mongodb+srv://System:root@cluster0.k8yy0.mongodb.net/Project4?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(ok=>console.log("Connected to Database"))
.catch(err=>console.log("Connection failed to DB",err))
module.exports=mongoose;