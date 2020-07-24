import React, { useEffect } from 'react'
import Welcome from './components/Welcome'
import Discussion from './components/Discussion'
import './App.css'

function App () {
  //title
  useEffect(() =>{
    document.title = "Regina's Course Activity"
  }, []);

  return (
    <div className='App'>
      <Welcome />
      <Discussion />
    </div>
  )
}

export default App
