import React from 'react';
import {useStateValue} from '../contaxt/StateProvider';
import {actionType} from '../contaxt/reducer';
import {motion} from 'framer-motion';
import {BiSearch} from 'react-icons/bi'



const SearchBox = () => {

    const [ {allSearch } , dispatch ] = useStateValue();

    const setAllSearch = (data)=>{
        dispatch({
            type:actionType.SET_ALL_SEARCH,
            allSearch:data,
        })
    }

  return (
        <div className=' flex justify-center items-center my-4 w-full h-20 bg-card '>
            <div className='w-full flex items-center rounded-md shadow-xl bg-primary justify-center p-4 gap-2'>
            <input type="text" placeholder='Search here...' 
            className=' border  w-656  font-semibold outline-none shadow-md bg-transparent hover:border-gray-500  bg-gray-50  border-gray-400 text-gray-900 text-sm rounded-lg block pl-10 p-2.5 hover:shadow-lg' value={allSearch} onChange={(e)=>setAllSearch(e.target.value)} />

            <motion.button className=' p-2.5 ml-2 text-sm font-medium text-white  bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 px-4 py-3 ocus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'><BiSearch/></motion.button>
            </div>
        </div>
)
}

export default SearchBox
