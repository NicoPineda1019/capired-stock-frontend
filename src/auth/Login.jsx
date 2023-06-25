import React, { useContext } from "react";
import { authenticateUser, validateRol } from "./authService";
import { Auth } from "../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPass, setUser } from "../store/login/loginSlice";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Login = ({ setAuth }) => {
  const { user, pass, error } = useSelector((state) => state.login);
  const auth = useContext(Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(user, pass, setAuth));
  };

  useEffect(() => {
    console.log("Auth", auth);
    if (auth?.sesion?.isValid()) {
      const groups = auth.sesion?.accessToken?.payload["cognito:groups"];
      console.log("groups", groups);
      const path = validateRol(groups);
      navigate(path);
    }
  }, [auth, navigate]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(setError(false));
      }, 3000);
    }
  }, [error, dispatch]);

  return (
    /*         <div className="row container-box">
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
        </div> */
    <section className="_login-container">
      <div className="_login-card">
        <h1>Iniciar Sesión</h1>
        <form>
        <FormControl margin="dense" variant="standard" fullWidth>
          <InputLabel htmlFor="input-with-icon-adornment">Usuario</InputLabel>
          <Input
            id="input-with-icon-adornment"
            placeholder="Escribre tú correo corporativo"
            onChange={(e) => dispatch(setUser(e.target.value))}
            autoComplete="username"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          <TextField
            sx={{
              marginTop: "20px",
            }}
            id="outlined-password-input"
            placeholder="Escribe tú contraseña"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            onChange={(e) => dispatch(setPass(e.target.value))}
          />
        </FormControl>
        <Button onClick={handleLogin} variant="contained" size="medium" fullWidth sx={{
            marginTop: '30px'
        }}>
            Ingresar
          </Button>

        </form>
      </div>
    </section>
  );
};

export default Login;
