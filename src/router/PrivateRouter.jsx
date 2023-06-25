import React, { useContext } from 'react'
import { Auth } from '../context/auth'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = ({children}) => {
    const auth = useContext(Auth)
    console.log('Result ', auth?.sesion?.isValid())
    return (
        <>
            {auth === null ?
                <div>Cargando</div>
                : auth?.sesion?.isValid() ? {...children} : <Navigate to='/login' />}
        </>
    )
}

export default PrivateRouter