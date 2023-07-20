import { getStock } from "../../services/stock"
import { closeLoading, openLoading } from "../loading/loadingSlice"
import { setNoSerializableInfo, setNumberPage, setSerializableInfo } from "./tableStockSlice"

export const getStockByStatus = (page, _status, user) => {
    return async (dispatch, getState) => {
        const { categoryTab } = getState().tableStock
        const isSerializable = categoryTab === "1";
        const path = isSerializable ? '/stock/stock-serializable' : categoryTab === "2" ? "/stock/stock-no-serializable" : "";
        dispatch(openLoading())
        await getStock(path, {
            idEstado: _status === '1' ? '1,4' : _status,
            page: page,
            user
        }).then((response) => {
            dispatch(setNumberPage(response.data.numberPages))
            if (isSerializable) dispatch(setSerializableInfo(response.data.items))
            else dispatch(setNoSerializableInfo(response.data.items))
        }).catch((err) => {
            console.error(err);
            if (isSerializable) dispatch(setSerializableInfo([]))
            else dispatch(setNoSerializableInfo([]))
        })
        .finally(() => dispatch(closeLoading()))
    }
}