import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import './index.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/read/:id' element={<Read />} />
      <Route path='/edit/:id' element={<Update />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
