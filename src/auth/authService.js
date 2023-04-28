import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"
import CognitoUserPool from "./CognitoUserPool"

export const authenticateUser = (userName, pass, setAuthContext) => {
    const user = new CognitoUser({
        Username: userName,
        Pool: CognitoUserPool,
    })
    const authDetails = new AuthenticationDetails({
        Username: userName,
        Password: pass,
    })
    user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            console.log('Response Auth ', data)
            setAuthContext({sesion: data, cognitoUser: user})
        },
        onFailure: (error) => {
            console.error('Error Auth', error)
            setAuthContext({error})
        },
        newPasswordRequired: (data) => {
            console.log('newPass ', data)
        }
    })
}

export const getCurrentUser = (userName, callback) => {
    const user = new CognitoUser({
        Username: userName,
        Pool: CognitoUserPool,
    })
    const cognitoUser = CognitoUserPool.getCurrentUser()
    if (!cognitoUser) return callback(null, 'Not authenticated')
    cognitoUser.getSession(function (error, sesion) {
        if (error) return callback(null, error)
        else callback({sesion, cognitoUser: user}, null)
    })
}