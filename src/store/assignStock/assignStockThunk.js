import { getStock, updateStock } from "../../services/stock"
import { mapUpdateStock, mapUsers } from "../../utils/map"
import { closeLoading, openLoading } from "../loading/loadingSlice"
import { setParameters } from "../toast/toastSlice"
import { setUsers, updateItemsSelected } from "./assignStockSlice"
const msgSuccess = 'Inventario asignado con éxito';
const msgError = 'Error asignando inventario';
const success = 'success';
const error = 'error'

export const getUsers = () => {
    return async(dispatch) => {
        dispatch(openLoading())
        getStock('/stock/user')
            .then((resp) => {
                const dataMapped = mapUsers(resp.data)
                dispatch(setUsers(dataMapped))
                sessionStorage.setItem('users', JSON.stringify(dataMapped))
            })
            .catch((err) => console.error(err))
            .finally(() =>  dispatch(closeLoading()))
    }
}

export const updateStockSerializable = () => {
    return async(dispatch, getState) => {
        const { stockItemsSelected, userAssign } = getState().assignStock
        const body = mapUpdateStock(stockItemsSelected, 4, userAssign.id)
        dispatch(openLoading())
        updateStock('/stock/stock-serializable', body)
            .then((resp) => {
                dispatch(setParameters({
                    show: true, 
                    msg: msgSuccess, 
                    type: success
                }))
            })
            .catch(err => {
                console.error(err)
                dispatch(setParameters({
                    show: true, 
                    msg: msgError, 
                    type: error
                }))
            })
            .finally(() => {
                dispatch(updateItemsSelected([]))
                dispatch(closeLoading())
            })


    }
}