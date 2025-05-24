import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopRated from './pages/TopRated';
import Upcoming from './pages/Upcoming'
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/toprated' element={<TopRated />} />
        <Route path='/upcoming' element={<Upcoming/>} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
