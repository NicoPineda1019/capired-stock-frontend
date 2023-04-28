import React, { useContext, useState } from 'react'
import { authenticateUser } from './authService'
import { Auth } from '../context/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setAuth }) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const auth = useContext(Auth)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        authenticateUser(user, password, setAuth)
    }

    useEffect(() => {
        if (auth?.sesion?.isValid()) navigate('/home')
    }, [auth])

    return (
        <div className="row">
            <div className="col-md-6 mx-auto p-0" style={{ marginTop: '10vh' }}>
                <div className="card">
                    <div className="login-box">
                        <div className="login-snip">
                            <div className='_login-logo'></div>
                            <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab">Login</label>
                            <div className="login-space">
                                <div className="login">
                                    <div className="group">
                                        <label htmlFor="user" className="label">Usuario</label>
                                        <input
                                            onChange={(e) => setUser(e.target.value)}
                                            id="user"
                                            type="text"
                                            className="input"
                                            placeholder="Ingresa tu usuario" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Contraseña</label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="pass"
                                            type="password"
                                            className="input"
                                            data-type="password"
                                            placeholder="Ingresa tu contraseña" />
                                    </div>
                                    <div className="group">
                                        <input type="submit" className="button" value="Ingresar" onClick={handleLogin} />
                                    </div>
                                    <div className="hr"></div>
                                    <div className="foot label">
                                        <a href="#">¿Olvidaste tu contrtaseña?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login