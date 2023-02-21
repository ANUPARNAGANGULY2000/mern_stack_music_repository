import { async } from '@firebase/util';
import axios from 'axios' ;

const baseURL = "http://localhost:4000/" ;

export const userValid = async (token) => {
    try{

        const res = await axios.get(`${baseURL}api/users/login`,{

             headers : {
                Authorization : "Bearer "+ token,
            },
        });
       return res.data;
    }catch (error) {}
};


//fetch all the users information 

export const  getAllUser = async () =>{

    try{

        const res = await axios.get(`${baseURL}api/users/getAllUsers`);
        return res.data;
    }catch(error){
        return null;
    }
}


// update the user role 

export const updateRole = async (user_id , role) =>{

    try{
            const res = axios.put(`${baseURL}api/users/updateRole/${user_id}`, {data : {role : role}});
            return res ;
    }catch(error){
        return null ; 
    } 
}


// delete the user 

export const deleteUser = async (id) => {

    try{

        const res = axios.delete(`${baseURL}api/users//delete/${id}`);
        return res ;
    } catch(error){
        return null ;
    }
}


// get all artists

export const getAllArtist = async() =>{

    try{

        const res = await axios.get(`${baseURL}api/artist/getAllArtists`);
        return  res.data ;
    }catch(error){

        return null;
    }
}


// save all artists 

export const saveArtist = async (data) =>{
    try{

        const res = axios.post(`${baseURL}api/artist/savenew`, {...data});
        return (await res).data.artists;
    }catch(error){
            return null;
    }
}

// get all songs 

export const getAllSongs = async () =>{

    try{

        const res = await axios.get(`${baseURL}api/songs/getAll`);
        return res.data;

    }catch(error){
        return null ;
    }
}

//save all songs data 

export const saveSongs = async(data) =>{

    try{

        const res = axios.post(`${baseURL}api/songs/savenew` , {...data});
        return (await res).data.songs;
    }catch(error){
        return null ;
    }
}


//get all albums

export const getAllAlbums = async () =>{

    try{

        const res = await axios.get(`${baseURL}api/album/getAll`);
        return res.data;

    }catch(error){
        return null ;
    }
}

// save all albums

export const saveAlbums = async(data)=>{

    try{

        const res =  axios.post(`${baseURL}api/album//savenew`, {...data});
        return ( await res).data.album;

    }catch(error){
        return null;
    }
}

