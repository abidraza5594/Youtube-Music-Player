import React from 'react'
import App from './App'
import {Route,Routes} from "react-router-dom"
import Login from './Login'

const Main = () => {
  return (
    <div>
        <Routes>
            <Route path='/home' element={<App/>}></Route>
            <Route path='/' element={<Login/>}></Route>

        </Routes>
        
    </div>
  )
}

export default Main