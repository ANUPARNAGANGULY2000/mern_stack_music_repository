const router = require("express").Router();

const artists = require("../models/artists");


router.post("/savenew", async (req , res )=>{

     const newArtists = artists({

        name : req.body.name ,
        imageURL  : req.body.imageURL,
        instagram  : req.body.instagram,
        facebook :  req.body.facebook ,
        twitter : req.body.twitter ,
     }); 

     try{
                const savedResult = await newArtists.save();

                return res.status(200).send({success : true , artists : savedResult });
     }catch{
                return res.status(400).send({success : false , msg : error });
     }
});


// fetching a particular artist information 
router.get("/getOneArtist/:id",async (req,res)=>{
  
  
   //return res.json(req.params.id);

    const filter = { _id : req.params.id };

    const data = await artists.findOne(filter) ;
     
    if(data)
    {
      return res.status(200).send({success : true , artists : data});
    }
    else {
      return res.status(400).send({success : false , msg : "Data not Found" });
    }
});


// fetching all the artists information 
router.get("/getAllArtists", async (req, res)=>{

   const options = {

      sort : {
         createdAt : 1,
      },
   };

   const data = await artists.find(options);

   if(data)
   {
     return res.status(200).send({success : true , artists : data});
   }
   else {
     return res.status(400).send({success : false , msg : "Data not Found" });
   }

});

// update the artist information 

router.put("/update/:id" , async ( req , res )=>{

   const filter = { _id : req.params.id };

   const options = {

      upsert : true ,
      now : true ,
   };

   try{
const updated =  await artists.findOneAndUpdate(
               
               filter , {

               name : req.body.name ,
               imageURL  : req.body.imageURL,
               instagram  : req.body.instagram,
               facebook :  req.body.facebook ,
               twitter : req.body.twitter ,
               },
                options );
return res.status(200).send({success : true ,data : updated });
            

   }catch(error){

      return res.status(400).send({success : false , msg : error });
   }
})



//Delete artist information 

router.delete("/delete/:id" , async(req , res ) => {

   const filter = { _id : req.params.id };

   const deleted = await artists.deleteOne(filter);

   if(deleted )
   {
     return res.status(200).send({success : true , msg : "Deleted Successfully "});
   }
   else {
     return res.status(400).send({success : false , msg : "Error : try again" });
   }


});

module.exports = router ;