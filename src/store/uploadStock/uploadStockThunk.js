import { STATES } from "../../constants";
import { getStock, postStock, updateStock } from "../../services/stock"
import { mapMaterials, mapPostStock, mapUpdateStockNoSerializable } from "../../utils/map"
import { closeLoading, openLoading } from "../loading/loadingSlice"
import { openModal, setModalInfo } from "../modal/modalSlice";
import { setParameters } from "../toast/toastSlice";
import { setItemSerializableStock, setMaterial } from "./uploadStock"
const msgSuccess = 'Inventario cargado con éxito';
const msgError = 'Error cargando inventario';
const success = 'success';
const error = 'error'

export const uploadStock = () => {
    return async (dispatch, getState) => {
        const { serializableStock, category } = getState().uploadStock
        const body = category === "1" ? mapPostStock(serializableStock) : mapUpdateStockNoSerializable(serializableStock, STATES.STOCK, 0, '+')
        const path = category === "1" ? '/stock/stock-serializable' : category === "2" ? "/stock/stock-no-serializable" : "";
        const method =  category === "1" ? postStock : updateStock;
        dispatch(openLoading())
        await method(path, body)
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

export const uploadArrivalConfimration = (base64) => {
    return async(dispatch) => {
        dispatch(openLoading())
        updateStock('/stock/arrival-confirmation', {
            file: base64
        })
        .then((resp) => {
            dispatch(setModalInfo({
                totalSend: resp.data.totalSend,
                totalFound: resp.data.totalFound,
                serialesRemaining: resp.data.serialesRemaining.join(),
            }))
            dispatch(openModal())
        })
        .catch(err => console.error(err))
        .finally(() => {
            dispatch(closeLoading())
        })
    }
}