import React, { useState, useEffect } from 'react'

function Welcome () {
  const [self, setSelf] = useState('attendee')

  //useEffect to fetch personal information, name
  useEffect(() => {
    fetch('http://localhost:4001/getSelf')
      .then(res => res.json())
      .then(data => setSelf(data.name))
  }, [])

  return (
    <p>Welcome to {self}'s Canvas Discussion Board!</p>
  )
}

export default Welcome
