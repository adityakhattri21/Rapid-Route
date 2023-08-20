import React, { useState } from 'react'
import {ContentCopy} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab"
import {IconButton} from "@mui/material"
import { FormControl, FormHelperText } from '@mui/material';
import axios from "axios";
import {Toaster, toast} from "react-hot-toast"




const Home = () => {

  const [input , setInput] = useState({
    longUrl:"",
    urlCode:""
  })
  const [shortUrl , setShortUrl] = useState("");
  const [error , setError] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const config = {headers:{"Content-Type":"application/json"}};

  const handleCopyClick = () => {
    const inputElement = document.createElement('input');
    inputElement.value = shortUrl;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand('copy');
    document.body.removeChild(inputElement);
   toast.success("Copied To Clipboard");
  };

  const handleInput = (e) =>{
    const {id,value} = e.target;
    setInput({...input,[id]:value});
    setError(false)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
        handleSubmit();
    }
};

 const handleSubmit = async (e)=>{
   e.preventDefault();
   if(!input.longUrl){
    setError(true);
    return ;
   }
   setIsLoading(true);
   try{
   const {data} = await axios.post("/api/v1/url/generate",input,config);
   data && console.log(data);
   setIsLoading(false);
    setShortUrl(`${window.location.href}${data.shortUrl.urlCode}`);
   }catch(error){
    setIsLoading(false);
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



  return (
    <>
    <div className='p-5 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold text-teal-600 mb-5'>URL Shortener</h1>
      <div className='pt-10 pb-10 pl-5 pr-5 border-2 
      border-gray-400 shadow-2xl rounded-lg w-1/2 max-[600px]:w-full'>
      <form onSubmit={handleSubmit}>
        <p className='text-lg font-medium max-[600px]:text-sm'>Convert long URLs into shortened versions with a single click</p>
        
        <FormControl className='w-full' error={error}>
        <input id="longUrl"
        placeholder='https://longURLexample.com' className='w-full mt-2 border-2 p-2'
          onChange={handleInput}
          onKeyDown={ handleEnter }
        />
        
        {error?<FormHelperText>URL Needed</FormHelperText>:<FormHelperText>Enter Your Long URL</FormHelperText>}
        </FormControl>
        <div className='mt-5'>
      <p className='text-lg font-medium mb-2 max-[600px]:text-sm'>Create personalized and memorable links for your URLs (Optional)</p>
      <div className='max-[600px]:flex-col max-[600px]:flex'>
      <input placeholder={`${window.location.href}`} className='border-2 w-1/2 p-2 bg-slate-100 max-[600px]:w-full' readOnly/>
      <input id="urlCode" className='border-2 p-2 w-1/2 max-[600px]:w-full' 
      placeholder='your personalized value' onChange={handleInput}
      onKeyDown={ handleEnter }
      />
      </div>
      </div>
      <div className='flex justify-center mt-7'>
      <LoadingButton variant='contained' type='submit' loading={isLoading}><span>Submit</span></LoadingButton>
      </div>
      </form>
      </div>
      
      {shortUrl && <>
        <div className='w-full flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-bold text-teal-600 mt-5 mb-5'>Here is your short URL </h2>
        <div className='flex pt-10 pb-10 pl-5 pr-5 border-2 border-gray-400 shadow-2xl rounded-lg w-1/2 max-[600px]:w-full'>
       <input value={shortUrl} placeholder='Short URl' className='text-center border-2 w-full p-2 bg-slate-100 max-[600px]:w-full'/><IconButton onClick={handleCopyClick}><ContentCopy/></IconButton>
      </div>
      </div>
      </>}
     
    </div>
    <Toaster  position="bottom-center"
  reverseOrder={false}/>
    </>
  )
}

export default Home
