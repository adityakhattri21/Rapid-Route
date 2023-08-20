import {Tooltip } from '@mui/material'
import {InsertLink,HelpOutline} from '@mui/icons-material'
import React from 'react'

const Header = () => {
    const value = "Enter URL, Unleash Magic with a Click.";
  return (
    <div className='pl-10 pr-10 pt-5 pb-5 flex  w-screen justify-between border-b-2  max-[800px]:flex-col'>
    <div className='flex items-center  w-1 '>
     <h1 className='text-2xl max-[600px]:pb-2 '>RapidRoute</h1>
    <InsertLink className='ml-2'/>
    </div>
    <p className='text-xl font-bold text-gray-400 tracking-wide '>Trim URLs, Expand Your Linking Possibilities Today.</p>
      <Tooltip title={value} arrow className='cursor-pointer'>
        <HelpOutline className='max-[800px]:invisible'/>
      </Tooltip>

     

    </div>
  )
}

export default Header
