
const bcrypt = require('bcryptjs');

require('../config/passport'); // requiring passport configurations

const { registerValidator,loginValidator } = require("../utils/validators/auth");
const User = require("../models/user")


// const login = async (req, res) => {
//   // res.send("hello form login");
//   try{

//     const {email,password} = req.body;

//     const result = await loginValidator.validateAsync({
//       email,
//       password,
//     });

//     const isUser = await User.findOne({ email :  result.email });
//     if(!isUser ) return res.status(401).json({ success : false , error : { err : "User not found"}});

//     const isValidPassword = await bcrypt.compare( result.password , isUser.password );

//     if( !isValidPassword ) return res.status(200).json({ success : false , errors : { err : "ypur password is incorrect"}});

//    return res.status(200).json({ success : true , data : { user : { username : isUser.username , email : isUser.email  }}})

//   }catch(err){
//     res.send(err)
//   }

// };

const login = async ( req , res ) => { 
  const { _id , username , email } = req.user ; 
  console.log( { _id , username , email } )
  res.status(200).json({ success : true , data : { _id , username , email  }})
}


const register = async (req, res) => {
  try {
    // [x]get data from req
    const { username, password, email } = req.body;
    // [x]validate data from req
    const result = await registerValidator.validateAsync({
      username,
      password,
      email,
     
    });
    // []check if user is already exist in database

    const isUser = await User.findOne({  email });

    // []create if user not exist
    if (!isUser) {

      const salt =await  bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password , salt);


     const newUser = await User.create({
      email , 
      password : hash , 
      username 
     });


  // []send res with json

      return res.status(200).json({
        success: true,
        user: {
          id: newUser._id,
          username,
          email,
        },
      });
    }else {
  // []send error if user exist
  // []send res with json

      return res.status(403).json({ success : false , message : "user already exists"})
    }
  } catch (err) {
    // [x]if validation failed res error
    console.log( err )
    res.status(400).json({ success: false, error: { err } });
  }

  // res.status(200).send("check");
};

module.exports = { login, register };
