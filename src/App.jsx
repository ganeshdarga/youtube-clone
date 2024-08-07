import React, { useState,createContext } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'


export const SearchContext = createContext();


const App = () => {

  const [sidebar,setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [searchId,setSearchId] = useState(0)
  

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery,searchId,setSearchId}}>
    <div>
      <Navbar setSidebar={setSidebar}></Navbar>
      <Routes>
        <Route path='/youtube-clone' element={<Home sidebar={sidebar}></Home>}></Route>
        <Route path='/video/:categoryId/:videoId' element={<Video></Video>}></Route>
      </Routes>
    </div>
    </SearchContext.Provider>
  )
}

export default App