import { STATES } from "../../constants";
import { getStock, updateStock } from "../../services/stock";
import {
  mapUpdateStock,
  mapUpdateStockNoSerializable,
  mapUsers,
} from "../../utils/map";
import { closeLoading, openLoading } from "../loading/loadingSlice";
import { setParameters } from "../toast/toastSlice";
import { setUsers, updateItemsSelected } from "./assignStockSlice";
const msgSuccess = "Inventario asignado con éxito";
const msgError = "Error asignando inventario";
const success = "success";
const error = "error";

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(openLoading());
    getStock("/stock/user")
      .then((resp) => {
        const dataMapped = mapUsers(resp.data);
        dispatch(setUsers(dataMapped));
        sessionStorage.setItem("users", JSON.stringify(dataMapped));
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(closeLoading()));
  };
};

export const updateStockSerializable = () => {
  return async (dispatch, getState) => {
    const { stockItemsSelected, userAssign } = getState().assignStock;
    const itemSerializable = [];
    const itemsNoSerializable = [];
    stockItemsSelected.forEach((item) => {
      if (!!item.serial) {
        itemSerializable.push(item);
      } else itemsNoSerializable.push(item);
    });
    const bodySerializable = mapUpdateStock(
      itemSerializable,
      STATES.PENDIENTE,
      userAssign.id
    );
    const bodyNoSerializableStock = mapUpdateStockNoSerializable(
      itemsNoSerializable,
      STATES.STOCK,
      0,
      "-"
    );
    const bodyNoSerializablePendiente = mapUpdateStockNoSerializable(
      itemsNoSerializable,
      STATES.PENDIENTE,
      userAssign.id
    );

    const promises = [];
    if (itemSerializable.length > 0) {
      promises.push(updateStock("/stock/stock-serializable", bodySerializable));
    }
    if (itemsNoSerializable.length > 0) {
      promises.push(
        updateStock("/stock/stock-no-serializable", bodyNoSerializableStock)
      );
      promises.push(
        updateStock("/stock/stock-no-serializable", bodyNoSerializablePendiente)
      );
    }
    const promisesResponse = Promise.all(promises);
    promisesResponse.then(() => {
      dispatch(
        setParameters({
          show: true,
          msg: msgSuccess,
          type: success,
        })
      );
    });
    promisesResponse.catch((err) => {
      console.error(err);
      dispatch(
        setParameters({
          show: true,
          msg: msgError,
          type: error,
        })
      );
    });
    promisesResponse.finally(() => {
      dispatch(updateItemsSelected([]));
      dispatch(closeLoading());
    });
  };
};
export const updateStockPending = () => {
  return async (dispatch, getState) => {
    const { stockItemsIncoming } = getState().inboxStock;
    const itemSerializableAccept = [];
    const itemsSerializableReturn = [];
    const itemNoSerializableAccept = [];
    const itemsNoSerializableReturn = [];
    stockItemsIncoming.forEach((item) => {
      if (!!item.serial) {
        if (item._state === 'accept') itemSerializableAccept.push(item);
        if (item._state === 'return') itemsSerializableReturn.push(item)
      } else {
        if (item._state === 'accept') itemNoSerializableAccept.push(item);
        if (item._state === 'return') itemsNoSerializableReturn.push(item)
      };
    });

    const promises = [];
    if (itemSerializableAccept.length > 0) {
      const bodySerializableAssigned = mapUpdateStock(
        itemSerializableAccept,
        STATES.ASIGNADO,
        "SAME_USER"
      );  
      promises.push(updateStock("/stock/stock-serializable", bodySerializableAssigned));
    }
    if (itemsSerializableReturn.length > 0) {
      const bodySerializableReturned = mapUpdateStock(
        itemsSerializableReturn,
        STATES.STOCK
      );
      promises.push(updateStock("/stock/stock-serializable", bodySerializableReturned));
    }
    if (itemNoSerializableAccept.length > 0) {
      const bodyNoSerializableStockPendiente = mapUpdateStockNoSerializable(
        itemNoSerializableAccept,
        STATES.PENDIENTE,
        "SAME_USER",
        "-"
      );
      const bodyNoSerializableStockAssigned = mapUpdateStockNoSerializable(
        itemNoSerializableAccept,
        STATES.ASIGNADO,
        "SAME_USER"
      );
      updateStock("/stock/stock-no-serializable", bodyNoSerializableStockPendiente)
      updateStock("/stock/stock-no-serializable", bodyNoSerializableStockAssigned)
    }
    const promisesResponse = Promise.all(promises);
    promisesResponse.then(() => {
      dispatch(
        setParameters({
          show: true,
          msg: msgSuccess,
          type: success,
        })
      );
    });
    promisesResponse.catch((err) => {
      console.error(err);
      dispatch(
        setParameters({
          show: true,
          msg: msgError,
          type: error,
        })
      );
    });
    promisesResponse.finally(() => {
      dispatch(closeLoading());
    });
  };
};
