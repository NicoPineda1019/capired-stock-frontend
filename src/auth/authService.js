import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"
import CognitoUserPool from "./CognitoUserPool"
import { closeLoading, openLoading } from "../store/loading/loadingSlice"
import { setError, setPass } from "../store/login/loginSlice"
import { ADMIN_ROLE, TECH_ROLE } from "../constants"

export const authenticateUser = (userName, pass, setAuthContext) => {
    return async(dispatch) => {
        const user = new CognitoUser({
            Username: userName,
            Pool: CognitoUserPool,
        })
        const authDetails = new AuthenticationDetails({
            Username: userName,
            Password: pass,
        })
        dispatch(openLoading())
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                user.getSession(function (error, sesion) {
                    if (error) return console.error(error)
                    else console.log(sesion)
                })
                
                setAuthContext({sesion: data, cognitoUser: user})
                dispatch(closeLoading())
            },
            onFailure: (error) => {
                console.error('Error Auth', error)
                setAuthContext({error})
                dispatch(closeLoading())
                dispatch(setPass(''))
                dispatch(setError(true))
            },
            newPasswordRequired: (data) => {
                dispatch(closeLoading())
                console.log('newPass ', data)
            },
        })

    }
}

export const getCurrentUser = (userName, callback) => {
    const user = new CognitoUser({
        Username: userName,
        Pool: CognitoUserPool,
    })
    const cognitoUser = CognitoUserPool.getCurrentUser()
    if (!cognitoUser) return callback(null, 'Not authenticated')
    cognitoUser.getSession(function (error, sesion) {
        user.refreshSession(sesion.getRefreshToken(), function (err, resp){
            if (error) return callback(null, error)
            else callback({sesion: resp, cognitoUser: user}, null)
        })
    })

}

export const validateRol = (groups) => {
    if (groups.includes(ADMIN_ROLE)){
        sessionStorage.setItem('ROLE',ADMIN_ROLE)
        return '/admin/summary'
    }
    if (groups.includes(TECH_ROLE)){
        sessionStorage.setItem('ROLE',TECH_ROLE)
        return '/tech/stock'
    }
}
