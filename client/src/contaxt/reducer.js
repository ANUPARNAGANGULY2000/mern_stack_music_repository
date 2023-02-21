export const actionType = {

    SET_USER : "SET_USER",
    SET_ALL_USERS : "SET_ALL_USERS",
    SET_ALL_ARTISTS : "SET_ALL_ARTISTS",
    SET_ALL_ALBUMS : "SET_ALL_ALBUMS",
    SET_ALL_SONGS :"SET_ALL_SONGS",
    ALL_FILTER : "ALL_FILTER",
    SET_ARTIST_FILTER : "SET_ARTIST_FILTER",
    SET_ALBUM_FILTER : "SET_ALBUM_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_ALL_SEARCH : "SET_ALL_SEARCH",
    SET_SONG_TRACK : "SET_SONG_TRACK",
    SET_IS_PLAYER_ON :"SET_IS_PLAYER_ON",
    SET_MINI_PLAYER :"SET_MINI_PLAYER",
    
};

const reducer = (state , action ) => {

console.log (action);

switch(action.type){

    case actionType.SET_USER:
        return {

            ...state,
            user : action.user ,
        }


    case actionType.SET_ALL_USERS:
        
        return {

            ...state,
            allUsers : action.allUsers ,
        }

    case actionType.SET_ALL_SONGS:
        return {

            ...state ,
            allSongs : action.allSongs,
        }

    case actionType.SET_ALL_ARTISTS :
        return {

            ...state ,
            allArtists : action.allArtists,
        }

    case actionType.SET_ALL_ALBUMS :
        return {

            ...state ,
            allAlbums : action.allAlbums,
        }

    case actionType.ALL_FILTER:
        return {

            ...state,
            allFilter: action.allFilter,
        }

    case actionType.SET_ALBUM_FILTER : 
    return {

        ...state,
        albumFilter: action.albumFilter,
    }

    case actionType.SET_ARTIST_FILTER:
        return{

            ...state ,
            artistFilter: action.artistFilter,
        }

    case actionType.SET_LANGUAGE_FILTER:

        return {


            ...state,
            languageFilter : action.languageFilter,
        }
    
    case actionType.SET_ALL_SEARCH :
        
        return {

        ...state,
        allSearch :action.allSearch,
    } 

    case actionType.SET_SONG_TRACK:
        return {

            ...state,
            songTrack : action.songTrack, 
        }

    case actionType.SET_IS_PLAYER_ON:
        return{
            ...state,
            isPlayerOn : action.isPlayerOn,
   
        }

    case actionType.SET_MINI_PLAYER:
        return {
            ...state,
            miniplayer : action.SET_MINI_PLAYER ,
        }

    default : 
            return state ;
}
}

export default reducer ;