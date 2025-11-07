import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Landing/Landing'


function App() {


  return (
    <>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        
     
      </Routes>
      
      
    </>
  )
}

export default App
