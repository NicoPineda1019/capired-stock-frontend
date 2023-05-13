import { getStock } from "../../services/stock"
import { setLoading, setNumberPage, setSerializableInfo } from "./tableStockSlice"

export const getStockByStatus = (page, _status) => {
    return async (dispatch) => {
        const path = '/stock/stock-serializable'
        dispatch(setLoading(true))
        await getStock(path, {
            idEstado: _status,
            page: page
        }).then((response) => {
            dispatch(setNumberPage(response.data.numberPages))
            dispatch(setSerializableInfo(response.data.items))
        }).catch((err) => console.error(err))
        .finally(() => dispatch(setLoading(false)))
    }
}