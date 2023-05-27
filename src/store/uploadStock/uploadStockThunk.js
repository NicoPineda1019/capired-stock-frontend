import { getStock, postStock } from "../../services/stock"
import { mapMaterials, mapPostStock } from "../../utils/map"
import { closeLoading, openLoading } from "../loading/loadingSlice"
import { setCheckLoading, setItemSerializableStock, setMaterial } from "./uploadStock"


export const uploadStock = () => {
    return async (dispatch, getState) => {
        const { serializableStock, category } = getState().uploadStock
        const body = mapPostStock(serializableStock)
        const path = category === "1" ? '/stock/stock-serializable' : category === "2" ? "/stock/stock-no-serializable" : "";
        dispatch(openLoading())
        await postStock(path, body)
            .then((resp) => console.log(resp))
            .catch(err => console.error(err))
            .finally(() => {
                dispatch(setItemSerializableStock([]))
                dispatch(closeLoading())
                dispatch(setCheckLoading(true))
                setTimeout(() => {
                    dispatch(setCheckLoading(false))
                }, 5000);
            })
    }
}

export const getMaterials = () => {
    return async(dispatch) => {
        const path = '/stock/material'
        dispatch(openLoading())
        await getStock(path)
            .then((resp) => {
                const dataMapped = mapMaterials(resp.data)
                dispatch(setMaterial(dataMapped))
                sessionStorage.setItem('materials', JSON.stringify(dataMapped))
            })
            .catch((err) => console.error(err))
            .finally(() => dispatch(closeLoading()))
    }
}