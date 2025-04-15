import React from 'react'
import { useRouteError } from 'react-router'

const Error = () => {
    const err = useRouteError();
    console.log('Error in Routing', err);
    
  return (
    <div>
      Oops! Something went wrong
    </div>
  )
}

export default Error
