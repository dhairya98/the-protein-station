import React from 'react'
import User from './User'
import UserClass from './UserClass'

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <User name="Dhairyaa from functional component" />
      <UserClass name = "Dhairya from class component" />
      <UserClass name = "Elon from class component" />
    </div>
  )
}

export default About
