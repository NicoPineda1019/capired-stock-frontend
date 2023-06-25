import { configureStore } from '@reduxjs/toolkit'
import assignStockSlice from './assignStock/assignStockSlice'
import loadingReducer from './loading/loadingSlice'
import loginReducer from './login/loginSlice'
import modalSlice from './modal/modalSlice'
import summaryStockSlice from './summaryStock/summaryStockSlice'
import tableStockSlice from './tableStock/tableStockSlice'
import toastSlice from './toast/toastSlice'
import uploadStockSlice from './uploadStock/uploadStock'
import inboxStockSlice from './inboxStock/inboxStockSlice'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    login: loginReducer,
    tableStock: tableStockSlice,
    uploadStock: uploadStockSlice,
    assignStock: assignStockSlice,
    toast: toastSlice,
    summaryStock: summaryStockSlice,
    modal: modalSlice,
    inboxStock: inboxStockSlice
  },
})