'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
const Social = () => {
  return (
    <div className='flex w-full items-center gap-x-2'>
      <Button 
      size="lg"
      variant="outline"
      onClick={() => {}}
      className='w-full'>
        <FaGoogle className='h-5 w-5'/>
      </Button>
      <Button 
      size="lg"
      variant="outline"
      onClick={() => {}}
      className='w-full'>
      <FaGithub className='h-5 w-5'/>
      </Button>
    </div>
  )
}

export default Social