const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const studentSchema = new mongoose.Schema({
    firstname : {
       type : String,
       required :true
},
lastname : {
    type : String,
    required :true
},
emailid : {
    type : String,
    required :true,
    unique : true
},
username : {
    type : String,
    required :true,
    unique : true
},
phone : {
    type : Number,
    required :true,
    unique : true
},

gender : {
    type : String,
    required :true
},
address : {
    type : String,
    required :true
},
password : {
    type : String,
    required :true
},
confirmpassword : {
    type : String,
    required :true
},
tokens:[{
 token:{
    type: String,
    required: true
 }
}]

})


studentSchema.methods.generateAuthToken = async function(){
try{
    console.log("the id is "+ this._id)
const tokn = jwt.sign({_id : this._id.toString()}, process.env.SECRET_KEY);
// const tokn = jwt.sign({_id : this._id.toStrdddding()},"therearethirtytwocharactersinthejsonwentoken");


this.tokens = this.tokens.concat({token: tokn})
await this.save();
console.log(tokn);
return tokn;

}
catch{
 res.send("error is"+error);
console.log("error is"+error);

}
}



studentSchema.pre("save", async function (next){

    if(this.isModified("password")){
    // const passwordHash = await bcrypt.hash(password,4);
    // console.log(`the current entered password is ${this.password}`);
    this.password = await bcrypt.hash(this.password , 10);
    console.log(`the current entered password is ${this.password}`);

    // this.confirmpassword= undefined;

    this.confirmpassword = await bcrypt.hash(this.password , 10);


    }
    next();
})

const Register = new mongoose.model("Register",studentSchema);

module.exports = Register ;