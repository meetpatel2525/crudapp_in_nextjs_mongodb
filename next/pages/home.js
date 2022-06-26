import React from 'react'
import withAuth from './WithAuth';

const home = () => {

  return (
    <div style={{margin:"5%"}} >hi its  meet patel home </div>
  )
}

export default  withAuth (home)