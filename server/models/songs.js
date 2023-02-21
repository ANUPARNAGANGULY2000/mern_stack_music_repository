const mongoose = require("mongoose");

const songScheme = mongoose.Schema(
    {

        name : {
            type : String,
            required : true ,  
        },

        imageURL  : {
            type : String,
            required : true ,  
        },
        
        songURL  : {
            type : String,
            required : true ,  
        },

        artist  : {
            type : String,
            required : true ,  
        },

        albumm  : {
            type : String,  
        },

        language  : {
            type : String,
            required : true ,  
        },

        category  : {
            type : String,
            required : true ,  
        },
    },
    {timestamps : true }
);

module.exports = mongoose.model ("songs" , songScheme );