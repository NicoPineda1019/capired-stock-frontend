import React, { useContext } from 'react'
import { Auth } from '../context/auth'
import { Navigate, Outlet } from 'react-router-dom'
import "../services/interceptor"

const PrivateRouter = ({children}) => {
    const auth = useContext(Auth)
    return (
        <>
            {auth === null ?
                <div>Cargando</div>
                : auth?.sesion?.isValid() ? {...children} : <Navigate to='/login' />}
        </>
    )
}

export default PrivateRouter