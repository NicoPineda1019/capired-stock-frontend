import axios from 'axios';
import CognitoUserPool from "../auth/CognitoUserPool"

axios.interceptors.request.use( req => {
    const cognitoUser = CognitoUserPool.getCurrentUser()
    const storage = cognitoUser.storage
    const accesTokenKey = Object.keys(storage).filter((key) => key.includes('idToken'))[0]
    const accessToken = storage[accesTokenKey]
    req.headers.Authorization = accessToken
    return req;
  });