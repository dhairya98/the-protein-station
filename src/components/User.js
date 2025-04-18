import React from 'react'

const User = ({name}) => {
  return (
    <div className = "user-card m-4 p-4 bg-gray-50 rounded-lg">
        <h2>Name: {name}</h2>
        <h2>Location: Hyderabad</h2>
        <h2>Contact: github.com/dhairya98</h2>
    </div>
  )
}

export default User
