import React, { useContext, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Login from '../auth/Login'
import Home from '../pages/Home'
import { Auth } from '../context/auth'
import { useEffect } from 'react'
import { getCurrentUser } from '../auth/authService'
import PrivateRouter from './PrivateRouter'

const AppRouter = () => {
  const [authContext, setAuthContext] = useState(null)
  useEffect(() => {
    getCurrentUser('', (session, error) => {
      if (error) return setAuthContext({error})
      setAuthContext(session)
    })
  }, [])

  return (
    <BrowserRouter>
      <Auth.Provider value={authContext}>
        <Routes>
          <Route path='/*' element={
            <PrivateRouter>
              <Routes>
                <Route path='/home' element={<Home />} />
              </Routes>
            </PrivateRouter>
          } />
          <Route path='/login' element={<Login setAuth={setAuthContext}/>} />
          <Route path='/' element={<Navigate to={'/login'} />} />
        </Routes>
      </Auth.Provider>
    </BrowserRouter>
  )
}

export default AppRouter