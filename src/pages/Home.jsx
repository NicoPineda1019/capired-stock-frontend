import React, { useContext } from 'react'
import { Auth } from '../context/auth'
import { useEffect } from 'react'

const Home = () => {
  const auth = useContext(Auth)
  console.log('auth', auth)
  useEffect(() => {
    fetch('https://3b75qovscl.execute-api.us-east-1.amazonaws.com/qa/-user', {
      headers: {
        Authorization: auth.sesion.accessToken.jwtToken
      }
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }, [])
  
  return (
    <div>Home Nicolas
      <button onClick={() => {
        auth?.cognitoUser?.signOut()
        auth?.cognitoUser?.globalSignOut({
          onSuccess: () => ({}),
          onFailure: () => ({})
        })}
        }>Salir</button>
    </div>
  )
}

export default Home