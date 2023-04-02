import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigationbar from './Navigationbar'
function RootLayout() {
  return (
    <div className='container  m-auto text-center mt-5 border border-shadow'>
      <div className=' row row-cols-2  vh-100'>
      <div className='col-2 border bg-light rounded-3'>
      <Navigationbar/>
      </div>
      <div className='col-10'>
      <Outlet/>
      </div>
      </div>
    </div>
  )
}

export default RootLayout 