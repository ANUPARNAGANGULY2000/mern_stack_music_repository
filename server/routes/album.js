const router = require("express").Router();

const  album = require("../models/album");



//post and save album information in the mongodb 
router.post("/savenew", async (req , res )=>{

    const  newAlbum = album(

        {
            name : req.body.name ,
            imageURL : req.body.imageURL,

        }
    );

    try{
            const savedResult = await newAlbum.save();
            
            return res.status(200).send({success : true , album : savedResult });
    }
    catch{
            return res.status(400).send({ success : false , msg : error });
    }

});


// get a particular data from the  backend 

router.get("/getOneAlbum/:id", async(req , res) => {

    const filter = { _id : req.params.id };

    const data = await album.findOne(filter);

    if(data)
    {
        return res.status(200).send({ success : true , album : data });
    }
    else {
        return res.status(400).send({ success : false , msg : "Error : not found "}) ;

    }
});


//get all album from backend 

router.get("/getAll" , async (req , res ) => {

    const options = {
        sort :  {
            createdAt : 1,

    },
};



const dataAll = await album.find(options);
if(dataAll){

   return  res.status(200).send({ success : true , album : dataAll });
}
else {

    return res.status(400).send({ success : false , msg : "Error : not found "});
}
});


// update album 

router.put("/update/:id" , async(req , res )=> {

    const filter = { _id : req.params.id };

    const options = {

      upsert : true ,
      now : true ,
    };

    try{

            const updated = await album.findOneAndUpdate(
                 filter ,
                 {
                    name : req.body.name ,
                    imageURL : req.body.imageURL,
        
                },
                 options
            );

            return res.status(200).send({ success : true , updated  });
    }catch(error){
        return res.status(400).send({ success : false , msg : error }) ;
    }
});

//delete album 
router.delete("/delete/:id", async (req , res )=> {

    const filter = { _id : req.params.id };

    try {
            const deleted = await album.deleteOne(filter);
            return res.status(200).send({ success : true , msg : "Deleted Successfully "})
    }
    catch(error){
        return res.status(400).send({success : false , msg : "Error : try again" });
    }
});


module.exports = router ;