import React from 'react'
import NotFound from '../assets/6329883.png'
function NotFoundPage() {
  return (
    <div className='h-[calc(100vh_-_76px)] flex justify-center items-center'>
        <img src={NotFound} alt='not found img' className='  md:w-auto w-full h-auto md:h-full' />
    </div>
  )
}

export default NotFoundPage