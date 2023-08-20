import React, { useEffect } from 'react';
import {PulseLoader} from "react-spinners";
import {useParams} from "react-router-dom"
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const Redirect = () => {
  const {urlCode}=useParams();

  const redirect = async ()=>{
    try{
      const {data} = await axios.get(`/api/v1/urls/${urlCode}`);
      console.log(data);
     data && window.location.replace(data.longUrl);
    }catch(error){
      toast.error(error.response.data.error,{
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: 'red',
          secondary: 'white',
        },
      });
    }
 
  }
 
   useEffect(()=>{
    if(urlCode)
    redirect();
   },[urlCode])

  return (
    <>
    <div className='w-full h-full flex flex-col justify-center items-center mt-20 font-mono font-bold text-2xl'>
      <span className='mb-5 mt-20'>Redirecting</span>
      <PulseLoader size={20} color='hsla(207,67%,53%,1)' speedMultiplier={0.5}/>
    </div>
    <Toaster  position="bottom-center"
  reverseOrder={false}/>
    </>
  )
}

export default Redirect
