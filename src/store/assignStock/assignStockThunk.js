import { getStock, updateStock } from "../../services/stock"
import { mapUpdateStock, mapUsers } from "../../utils/map"
import { closeLoading, openLoading } from "../loading/loadingSlice"
import { setUsers } from "./assignStockSlice"

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
        updateStock('/stock/stock-serializable', body)
            .then((resp) => console.log(resp))
            .catch(err => console.error(err))


    }
}