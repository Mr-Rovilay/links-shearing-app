'use client'
import Navbar from '@/components/navbar/Navbar'
import React, { useState } from 'react'

const Home = () => {
  const [view, setView] = useState('links'); 
  return (
    <div>
          <Navbar setView={setView} />
    </div>
  )
}

export default Home