import { getStock, postStock } from "../../services/stock"
import { mapMaterials, mapPostStock } from "../../utils/map"
import { closeLoading, openLoading } from "../loading/loadingSlice"
import { setParameters } from "../toast/toastSlice";
import { setItemSerializableStock, setMaterial } from "./uploadStock"
const msgSuccess = 'Inventario cargado con éxito';
const msgError = 'Error cargando inventario';
const success = 'success';
const error = 'error'

export const uploadStock = () => {
    return async (dispatch, getState) => {
        const { serializableStock, category } = getState().uploadStock
        const body = mapPostStock(serializableStock)
        const path = category === "1" ? '/stock/stock-serializable' : category === "2" ? "/stock/stock-no-serializable" : "";
        dispatch(openLoading())
        await postStock(path, body)
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
                dispatch(setItemSerializableStock([]))
                dispatch(closeLoading())
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