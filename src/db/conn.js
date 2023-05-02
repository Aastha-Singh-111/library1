const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/libreg",{
    useNewUrlParser:true,
    useUnifiedTopology : true,
    // useCreateIndex : true

}).then(()=>{
    console.log("connection succesful");
}).catch((e)=>{
    console.log("no connection");
    console.log(e);

})

// mongoose.connect("mongodb://localhost:27017/libreg",(err)=>{
//     if(err) console.log("unable to");
//     else{
//         console.log("successful");
//     }
// })