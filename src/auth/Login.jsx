import React, { useContext } from 'react'
import { authenticateUser } from './authService'
import { Auth } from '../context/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setPass, setUser } from '../store/login/loginSlice'

const Login = ({ setAuth }) => {
    const { user, pass, error } = useSelector(state => state.login)
    const auth = useContext(Auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(authenticateUser(user, pass, setAuth))
    }

    useEffect(() => {
        if (auth?.sesion?.isValid()) navigate('/home')
    }, [auth, navigate])
    useEffect(() => {
      if (error) {
        setTimeout(() => {
            dispatch(setError(false))
        }, 3000);
      }
    }, [error, dispatch])
    

    return (
        <div className="row container-box">
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
                                            onChange={(e) => dispatch(setUser(e.target.value))}
                                            id="user"
                                            type="text"
                                            className="input"
                                            placeholder="Ingresa tu usuario" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Contraseña</label>
                                        <input
                                            onChange={(e) => dispatch(setPass(e.target.value))}
                                            id="pass"
                                            type="password"
                                            value={pass}
                                            className="input"
                                            data-type="password"
                                            placeholder="Ingresa tu contraseña" />
                                    </div>
                                    <div className="group">
                                        <input
                                            type="submit"
                                            className="button"
                                            value="Ingresar"
                                            disabled={!user || !pass}
                                            onClick={handleLogin} />
                                    </div>
                                    {
                                        error &&
                                        <div className='group'>
                                            <span className='_login-error'>Contraseña incorrecta</span>
                                        </div>
                                    }
                                    <div className="hr"></div>
                                    <div className="foot label">
                                        <a href="/">¿Olvidaste tu contraseña?</a>
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