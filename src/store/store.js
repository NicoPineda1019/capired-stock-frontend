import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loading/loadingSlice'
import loginReducer from './login/loginSlice'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    login: loginReducer
  },
})