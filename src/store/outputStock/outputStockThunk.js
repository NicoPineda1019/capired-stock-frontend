import { getStock } from "../../services/stock"
import { mapWorks } from "../../utils/map"
import { setWorks } from "./outputStockSlice"

export const getWorks = () => {
    return async(dispatch) => {
        getStock("/stock/work")
        .then((resp) => {
            const data = mapWorks(resp.data)
            dispatch(setWorks(data))
            sessionStorage.setItem("works", JSON.stringify(data));
        })
        .catch((err) => {
            console.error(err)
            dispatch(setWorks([]))
        })
    }
}