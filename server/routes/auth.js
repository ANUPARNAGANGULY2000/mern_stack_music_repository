const router = require("express").Router();

const user = require("../models/user");
const admin = require("../config/firebase.config");
//const { castObject } = require("../models/user");


router.get("/login",async(req , res) => {

    if(!req.headers.authorization){
        return res.status(500).send( { message: "not valid Token"});

    }
    const token = req.headers.authorization.split(" ")[1];
    try{

        /*  if you supply the  key or token value through the api key that will  go and verify our database and it will decode the token 
        and it will fetch that  user information  if it is available  it will fetch in if it  is not available which  creates a new  user*/




        const  decodeValue = await admin.auth().verifyIdToken(token);

        if(!decodeValue ){
            return res.status(505).json({message : unAuthorized})
        }else{
           // return res.status(200).json(decodeValue);
           //checking the existence of the user

           const userExist = await  user.findOne({"user_id" : decodeValue.user_id})
           if(!userExist){
            userData(decodeValue , req, res)  // if the user is not  exist in the record then its need to store the new value in the db
           }else{
            updatedData(decodeValue , req , res); // update if already exist 
           }
        }

    }catch(error){
            return res.status(505).json({message : error})
    }
})

const userData = async ( decodeValue , req , res)=>{
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL : decodeValue.picture,
        user_id : decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time 

    })

    try{
        const savedUser = await newUser.save();
        res.status(200).send({user : savedUser})
    }catch(error){
        res.status(400).send({success : false , msg: error});
    }
}

// when data is already is there then its need to update the authentication time

const updatedData = async (decodeValue , req , res) => {

    const filter = { user_id : decodeValue.user_id } ;// filter  the exact data by there user id

    const options = {

        upsert : true ,
        new : true
    };

    try{

        const result = await user.findOneAndUpdate(
            filter ,
            { 
                auth_time : decodeValue.auth_time 
            },
            options
        );
        res.status(200).send({user : result})

    }catch {
        res.status(400).send({success : false , msg: error});
    }

}


// fetching all the users information 
router.get("/getAllUsers", async (req, res)=>{

    const options = {
 
       sort : {
          createdAt : 1,
       },
    };
 
    const data = await user.find(options);
 
    if(data)
    {
      return res.status(200).send({success : true , user : data});
    }
    else {
      return res.status(400).send({success : false , msg : "Data not Found" });
    }
 
 });


 // update the role of the user 
 router.put("/updateRole/:user_id" , async (req , res ) => {
    const filter = { _id : req.params.user_id } 
    const uprole = req.body.data.role ;

     try{

        const result = await user.findOneAndUpdate(filter , {role : uprole} );
        return res.status(200).send({ success : true , user : result });
     }
     catch(error){
        return res.status(400).send({ success : false , msg : error });
     }

 })

// delete  user 

 router.delete("/delete/:id" , async(req , res ) => {

    const filter = { _id : req.params.id };
 
    const deleted = await user.deleteOne(filter);
 
    if(deleted )
    {
      return res.status(200).send({success : true , msg : "Deleted Successfully "});
    }
    else {
      return res.status(400).send({success : false , msg : "Error : try again" });
    }
 
 
 });
 
module.exports = router;