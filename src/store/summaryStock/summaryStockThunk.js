import { getStock } from "../../services/stock"
import { closeLoading, openLoading } from "../loading/loadingSlice"
import { setItemsStock } from "./summaryStockSlice"

export const getSummaryStock = () => {
    return async(dispatch, getState) => {
        const { startDate, endDate } = getState().summaryStock
        dispatch(openLoading())
        getStock('/stock/all', {
            startDate,
            endDate
        })
        .then((resp) => {
            dispatch(setItemsStock(resp.data))
        })
        .catch((err) => {
            console.error(err)
            dispatch(setItemsStock([]))
        })
        .finally(() => dispatch(closeLoading()))
    }
}