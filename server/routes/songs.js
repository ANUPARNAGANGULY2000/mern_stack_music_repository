const router = require("express").Router();

const songs = require("../models/songs");


//post and save song information in the mongodb 
router.post("/savenew" , async (req , res) =>{

    const  songNew =  songs({

        name : req.body.name ,
        imageURL : req.body.imageURL ,
        songURL : req.body.songURL ,
        artist  : req.body.artist ,
        albumm  : req.body.albumm ,
        language : req.body.language , 
        category : req.body.category ,  
    });
    
    try{ 

        const savedResult = await songNew.save();

         return res.status(200).send({ success : true , songs: savedResult });
    }
    catch{
            return res.status(400).send({ success : true , msg : error });

    }
    
}
);



// get a particular data from the  backend 

router.get("/getOneSong/:id", async(req , res) => {

    const filter = { _id : req.params.id };

    const data = await songs.findOne(filter);

    if(data)
    {
        return res.status(200).send({ success : true , songs : data });
    }
    else {
        return res.status(400).send({ success : false , msg : "Error : not found "}) ;

    }
});

//get all songs from backend 

router.get("/getAll" , async (req , res ) => {

    const options = {
        sort :  {
            createdAt : 1,

    },
};

const dataAll = await songs.find(options);
if(dataAll){

   return  res.status(200).send({ success : true , songs : dataAll });
}
else {

    return res.status(400).send({ success : false , msg : "Error : not found "});
}
});


// update songs

router.put("/update/:id" , async(req , res )=> {

    const filter = { _id : req.params.id };

    const options = {

      upsert : true ,
      now : true ,
    };

    try{

            const updated = await songs.findOneAndUpdate(
                 filter ,
                 {
                    name : req.body.name ,
                    imageURL : req.body.imageURL ,
                    songURL : req.body.songURL ,
                    artist  : req.body.artist ,
                    albumm  : req.body.albumm ,
                    language : req.body.language , 
                    category : req.body.category ,  
        
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
            const deleted = await songs.deleteOne(filter);
            return res.status(200).send({ success : true , msg : "Deleted Successfully "})
    }
    catch(error){
        return res.status(400).send({success : false , msg : "Error : try again" });
    }
});

module.exports = router ;
