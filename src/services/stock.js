import axios from 'axios';

export const getStock = (path, params) => {
    return axios.get(`https://8oxhxp1tr0.execute-api.us-east-1.amazonaws.com/${process.env.REACT_APP_ENV_MODE}${path}`, {params})
}

export const postStock = (path, body) => {
    return axios.post(`https://8oxhxp1tr0.execute-api.us-east-1.amazonaws.com/${process.env.REACT_APP_ENV_MODE}${path}`, body)
}

export const updateStock = (path, body) => {
    return axios.put(`https://8oxhxp1tr0.execute-api.us-east-1.amazonaws.com/${process.env.REACT_APP_ENV_MODE}${path}`, body)
}