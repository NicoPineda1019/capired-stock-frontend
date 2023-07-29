import { STATES } from "../../constants";
import { getStock, updateStock } from "../../services/stock";
import {
  mapUpdateStock,
  mapUpdateStockNoSerializable,
  mapWorks,
} from "../../utils/map";
import { closeLoading, openLoading } from "../loading/loadingSlice";
import { setItemsStock, setWorks } from "./outputStockSlice";

export const getWorks = () => {
  return async (dispatch) => {
    getStock("/stock/work")
      .then((resp) => {
        const data = mapWorks(resp.data);
        dispatch(setWorks(data));
        sessionStorage.setItem("works", JSON.stringify(data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(setWorks([]));
      });
  };
};

export const getAllStockByStatus = (page, _status, user, pageSize) => {
  return async (dispatch) => {
    const pathSerializable = "/stock/stock-serializable";
    const pathNoSerializable = "/stock/stock-no-serializable";
    const promises = [];
    dispatch(openLoading());
    promises.push(
      getStock(pathSerializable, {
        idEstado: _status,
        page: page,
        user,
        pageSize,
      })
    );
    promises.push(
      getStock(pathNoSerializable, {
        idEstado: _status,
        page: page,
        user,
        pageSize,
      })
    );
    await Promise.allSettled(promises)
      .then((resp) => {
        const stockOne = resp[0].status === "fulfilled" ? resp[0]?.value.data.items : [];
        const stockTwo = resp[1].status === "fulfilled" ? resp[1]?.value.data.items : [];
        dispatch(setItemsStock([...stockTwo, ...stockOne]));
      })
      .catch((err) => {
        console.log('err')
        console.error(err)
      })
      .finally(() => dispatch(closeLoading()));
  };
};
export const updateStockConsumed = (reset) => {
  return async (dispatch, getState) => {
    const { itemsStock,work,accountNumber,workOrder,node } = getState().outputStock;
    const itemSerializable = [];
    const itemsNoSerializable = [];
    itemsStock.forEach((item) => {
      if (!(item.isConsumed && (item.nuevaCantidad || item.serial))) return
      if (!!item.serial) {
        itemSerializable.push(item);
      } else {
        itemsNoSerializable.push(item);
      }
    });

    const promises = [];
    if (itemSerializable.length > 0) {
      const bodySerializable = mapUpdateStock(
        itemSerializable,
        STATES.CONSUMIDO,
        "SAME_USER",
        {work,accountNumber,workOrder,node}
      );
      promises.push(updateStock("/stock/stock-serializable", bodySerializable));
    }
    if (itemsNoSerializable.length > 0) {
      const bodyNoSerializableStockAssigned = mapUpdateStockNoSerializable(
        itemsNoSerializable,
        STATES.ASIGNADO,
        "SAME_USER",
        "-"
      );
      const bodyNoSerializableStockConsumed = mapUpdateStockNoSerializable(
        itemsNoSerializable,
        STATES.CONSUMIDO,
        "SAME_USER",
        "+",
        {work,accountNumber,workOrder,node}
      );
      promises.push(
        updateStock(
          "/stock/stock-no-serializable",
          bodyNoSerializableStockAssigned
        )
      );
      promises.push(
        updateStock(
          "/stock/stock-no-serializable",
          bodyNoSerializableStockConsumed
        )
      );
    }
    if (promises.length === 0) return;
    dispatch(openLoading())
    const promisesResponse = Promise.all(promises);
    promisesResponse.then(() => {
    });
    promisesResponse.catch((err) => {
      console.error(err);
    });
    promisesResponse.finally(() => {
      dispatch(closeLoading());
      reset()
    });
  };
};
