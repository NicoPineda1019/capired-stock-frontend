import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loading/loadingSlice'
import loginReducer from './login/loginSlice'
import tableStockSlice from './tableStock/tableStockSlice'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    login: loginReducer,
    tableStock: tableStockSlice
  },
})