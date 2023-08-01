import React, { useContext, useState } from "react";
import { authenticateUser, validateRol } from "./authService";
import { Auth } from "../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPass, setUser } from "../store/login/loginSlice";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({ setAuth }) => {
  const { user, pass, error } = useSelector((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);

  const auth = useContext(Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(user, pass, setAuth));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (auth?.sesion?.isValid()) {
      const groups = auth.sesion?.accessToken?.payload["cognito:groups"];
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
          <FormControl sx={{ marginTop: '20px'}}>
          <InputLabel htmlFor="outlined-password-input">Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-password-input"
            placeholder="Escribe tú contraseña"
            size="small"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            onChange={(e) => dispatch(setPass(e.target.value))}
            error={error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {
            error && 
            <span className="_login-pass-error">Contraseña incorrecta</span>
          }
          </FormControl>
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
