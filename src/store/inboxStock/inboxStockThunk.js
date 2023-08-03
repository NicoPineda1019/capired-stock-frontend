import { getStock } from "../../services/stock"
import { closeLoading, openLoading } from "../loading/loadingSlice";
import { setStockItemsIncoming } from "./inboxStockSlice";

export const getStockByStatusAndUser = (_status, user) => {
    return async(dispatch, getState) => {
        const { categoryTab } = getState().inboxStock
        const isSerializable = categoryTab === "1";
        const path = isSerializable ? '/stock/stock-serializable' : categoryTab === "2" ? "/stock/stock-no-serializable" : "";
        dispatch(openLoading())
        getStock(path, {
            idEstado: _status,
            user
        }).then((resp) => {
            dispatch(setStockItemsIncoming(resp.data.items))
        }).catch(err => {
            dispatch(setStockItemsIncoming([]))
            console.error(err)
        }).finally(() => dispatch(closeLoading()))
    }
}