const express= require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');


const port =project.env.PORT || 3001;

const app=express();

const cors=require('cors');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const connectionString="mongodb+srv://aditya:adityakr8816616@cluster1.xohf2ha.mongodb.net/first?retryWrites=true&w=majority";

mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('connected to mongoDB');

    const userSchema= new mongoose.Schema({
      username:String,
      password:String,
    
        name:String,
      profession:String,
      ab:String,
     
      mobile:String,
      email:String,
      facebook:String,
      instagram:String,
      snapchat:String,
      skills: [
        {
          name: String,
          percentage: String
        }
      ],
      works:[{
      
        name:String,
        description:String
      }],


    });

    const user=  mongoose.model('users',userSchema);
/////////////////////////////////////////////////////////////////////////////
let search;
app.post("/",(req,res)=>{
const {searchText}= req.body;
search=searchText;
console.log("search text:",search);

});
////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/portfolio",(req,res)=>{
    user.find({username:search})
    .then((users)=>{
      const name = users[0].name;
      const prof = users[0].profession;
      const ab = users[0].ab;
      const email = users[0].email;
      const mobile = users[0].mobile;
      const facebook = users[0].facebook;
      const instagram = users[0].instagram;
      const snapchat = users[0].snapchat;
      const skills = users[0].skills;
      const works = users[0].works;
console.log(name);
console.log(ab);
res.status(200).json({name,prof,ab,email,mobile,facebook, instagram, snapchat,skills,works});
    })
    .catch((error) => {
      console.error('Error saving user:', error);
   
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////


app.post("/signup",async(req,res) =>{
  const {username,password}= req.body;
  // you have received the password from the client-side form
  const passwordFromClient = password;
  
  // Generate a salt to use for hashing (the salt adds randomness to the hash)
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  
  // Hash the password using bcrypt
  const hashedPassword = bcrypt.hashSync(passwordFromClient, salt);
console.log(username);
console.log(password);


user.find({username:username})
    .then((users)=>{
      console.log('Error while finding users:', error);
      res.status(500).json({ message: 'try other' });
      })
      .catch((error) => {
     
        const newUser = new user({
          username:username,
          password:hashedPassword,
           });
         
           newUser.save()
             .then(() => {
               console.log('sign up successfull');
               message= "You have successfully signed up";
               res.status(200).json({ message: 'Signup successful' });
               console.log(message);
             })
             .catch((error) => {
               console.error('Error saving user:', error);
            
             });
        
      });

});


/////////////////////////////////////////////////////////////////////////////////////////////////////
let na ; // Variable to store the name
let prof;
let usna='';
let passwo='';
app.post('/login',async(req,res)=>{
  const {username,password}= req.body;
 usna=username;
 passwo=password;

  console.log("login");
  user.find({username:username})
          .then((users) => {
            isPasswordMatch = false;

    users.forEach((user) => {
      const pass = user.password;
      console.log(password+" "+pass);
      if (bcrypt.compareSync(password, pass)) {
        isPasswordMatch = true;
        na= user.name;
        prof=user.prof;
        console.log("password match");
       // name= user.username;
        res.status(200).json({ message: 'Login successful' });
        // Additional actions or validations for a successful match can be performed here
      }
     
    });

    if (!isPasswordMatch) {
      console.log("invalid ");
      res.status(401).json({ message: 'Invalid username or password' });
    }

  })
  .catch((error) => {
    console.log('Error while finding users:', error);
    res.status(500).json({ message: 'Internal server error' });
    
  });




});




/////////////////////////////////////////////////////////////////
app.post("/account",(req,res)=>{
  user.find({username:usna})
  .then((users)=>{
    const name = users[0].name;
    const prof = users[0].profession;
    const ab = users[0].ab;
    const email = users[0].email;
    const mobile = users[0].mobile;
    const facebook = users[0].facebook;
    const instagram = users[0].instagram;
    const snapchat = users[0].snapchat;
    const skills = users[0].skills;
    const works = users[0].works;


res.status(200).json({name,prof,ab,email,mobile,facebook, instagram, snapchat,skills,works});
  })
  .catch((error) => {
    console.error('Error saving user:', error);
 
  });
});

////////////////////////////////////////////////////////////////////////////
app.post('/form-save', async (req, res) => {
  const { name, profession, about, mobile, email, facebook, instagram, snapchat ,skills,works} = req.body;

 
  user.find({username:usna})
          .then((users) => {
            isPasswordMatch = false;

    users.forEach((user) => {
      const pass = user.password;
      console.log(passwo+" "+pass);
      if (bcrypt.compareSync(passwo, pass)) {
        isPasswordMatch = true;
      
        user.name = name;
        user.profession = profession;
        user.ab = about;
      
        user.mobile = mobile;
        user.email = email;
        user.facebook = facebook;
        user.instagram = instagram;
        user.snapchat = snapchat;
        user.skills=skills;
        user.works=works;
         user.save();

    return res.status(200).json({ message: 'User details updated successfully' });
       
      }
     
    });

   

  })
  .catch((error) => {
    console.log('Error while finding users:', error);
    res.status(500).json({ message: 'Internal server error' });
    
  });

 
  
  skills.forEach((skill, index) => {
    const { name, percentage } = skill;
    console.log(`Skill ${index + 1}: Name - ${name}, Percentage - ${percentage}`);
  });
  works.forEach((work, index) => {
    const { name, photo,description } = work;
    console.log(`Work ${index + 1}: Name - ${name},description - ${description}`);
  });
 
  // Perform necessary operations with the received data

  // Send response back to the client
});

  ///////////////////////////////////////////////////
})
.catch((error)=>{
    console.log("error");
});




app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});