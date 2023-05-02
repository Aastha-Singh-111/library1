
require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const cookieParser= require("cookie-parser");

const bcrypt= require("bcryptjs")

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const static_path = (path.join(__dirname, "../public/"))

const templates_path = (path.join(__dirname, "../templates/views"));
const partials_path = (path.join(__dirname, "../templates/partials"));


app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({extended : false}));

// console.log(path.join(__dirname, "../public"));
app.use(express.static(static_path));
app.set("view engine" , "hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path)



console.log(process.env.SECRET_KEY);



app.get("/",(req,res)=>{
    // res.send("hello from aastha backend here from");
    res.render("index");
});
app.get("/register",(req,res)=>{
    // res.send("hello from aastha backend here from");
    res.render("register");
});

// creating a new user
app.post("/register",async(req,res)=>{
    // res.send("hello from aastha backend here from");
   try{

    // console.log(req.body.firstname);
    // res.send(req.body.firstname);

     const password = req.body.password;
     const cpassword = req.body.confirmpassword;

     if(password ===cpassword){
     const registerStudent = new Register({

        firstname : req.body.firstname,
        lastname : req.body.lastname,
        emailid : req.body.emailid,
        username : req.body.username,
        phone : req.body.phone,
        gender : req.body.gender,
        address : req.body.address,
        password : req.body.password,
        confirmpassword : req.body.confirmpassword
        
     })

const token = await registerStudent.generateAuthToken();
    
// syntax:res.cookie(name, value , [options])
res.cookie("jwt",token,{
   expires:new Date(Date.now()+30000),
   httpOnly: true 
});
console.log(cookie);



    const register = await registerStudent.save(); 
    console.log("the page part"+ register);


    res.status(201).render("login");


     }
     else{
        res.send("passwordmismatch")
     }
   } catch (error){
    res.status(400).send(error);
   }
});


app.get("/login",(req,res)=>{
    // res.send("hello from aastha backend here from");
    res.render("login");
});


app.get("/contact",(req,res)=>{
    // res.send("hello from aastha backend here from");
    res.render("contact");
});

app.post("/login",async(req,res)=>{
    // res.send("hello from aastha backend here from");
    // res.render("login");
    try{

        const uname = req.body.username;
        const pword = req.body.password;


      const usernam= await Register.findOne({username : uname });

    //   console.log(`${uname} and password is ${pword}`);
    //   console.log(usernam);
      
 
    const ismatch = await bcrypt.compare(pword, usernam.password);


    console.log(pword);
    console.log(usernam.password);
    console.log(typeof (pword));
    console.log(typeof (uname));

    console.log(typeof (usernam.password));
   

    
    const token = await usernam.generateAuthToken();
console.log("the token part in signin is "+ token)

res.cookie("jwt",token,{
    expires:new Date(Date.now()+50000),
    httpOnly: true 
 });

//  console.log("signin cokkie is"+cookie);

console.log("this is cookie awesome " + req.cookies.jwt)
 
    if(ismatch){
    // if(usernam.password===pword){

        res.status(201).render("contact");

    }
    
    else{
        res.send ("Password Mismatch");
    }



    }
    catch(error){
        res.status(400).send("invalid credentials")
    }
});



// const securepassword =async (password)=>{

//     const passwordhash = await bcrypt.hash(password , 4);
//     console.log (passwordhash);

//     const passwordmatch = await bcrypt.compare("aastha@123", passwordhash);
//     console.log (passwordmatch);

// }
// securepassword("aastha@123")




// const jwt = require("jsonwebtoken");
// const createtoken = async()=>{
//     const token = await jwt.sign({_id :"64142a2176aea249484a4cb5"},"weneedthirtytwocharactersinthesecretkeyinjsonwebtoken",{

//         expiresIn : "2 seconds"
//     });
//     console.log(token);

//     const userver = await jwt.verify(token ,"weneedthirtytwocharactersinthesecretkeyinjsonwebtoken");
//     console.log(userver);
// }
// createtoken();



app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})

// app.listen(3000);