import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import './App.css'
import { Task1 } from './pages/Task1'
import { Home } from './pages/Home'
import { Task2 } from './pages/Task2'
import { Task3 } from './pages/Task3'
import { Task4 } from './pages/Task4'
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/task1' element={<Task1/>}></Route>
          <Route path='/task2' element={<Task2/>}></Route>
          <Route path='/task3' element={<Task3/>}></Route>
          <Route path='/task4' element={<Task4/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
