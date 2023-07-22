import { Chip, Stack } from "@mui/material";
import { updateItemsSelected } from "../store/assignStock/assignStockSlice";
const moment = require('moment-timezone');
const timeZone = 'America/Bogota'

export const getRangeMonth = () => {
  const dateNow = moment().tz(timeZone)
  const firstDay = moment().tz(timeZone).set('D',1);
  return [
    firstDay.format("YYYY-MM-DD"),
    dateNow.format("YYYY-MM-DD")
  ]
}
export const formatValues = (a, b) => {
  const numberA = isNaN(a) ? 0 :  Number(a);
  const numberB = isNaN(b) ? 0 :  Number(b);
  return numberA + numberB
}
export const mapPostStock = (items) => {
  const dateNow = moment().tz(timeZone)
  const uploadDateTime = dateNow.format("YYYY-MM-DD HH:mm:ss")
  const updateDate = dateNow.format("YYYY-MM-DD")
  const updateTime = dateNow.format("HH:mm:ss")
  return items.map((item) => ({
    serial: item.serial,
    cantidad: item.cantidad,
    idMaterial: item.id?.id,
    fechaCargue: uploadDateTime,
    fechaActualizacion: updateDate,
    horaActualizacion: updateTime,
    idEstado: 1
  }))
};

export const mapUpdateStock = (items, status, userId) => {
  const dateNow = moment().tz(timeZone)
  const updateDate = dateNow.format("YYYY-MM-DD")
  const updateTime = dateNow.format("HH:mm:ss")
  const ids = items.map((item) => item.id).join(",");
  return {
    fechaActualizacion: updateDate,
    horaActualizacion: updateTime,
    idEstado: status,
    idUsuario: userId === "SAME_USER" ? items[0].id_usuario : userId,
    id: ids
  }
}
export const mapUpdateStockNoSerializable = (items, status, userId, operator = '+') => {
  const dateNow = moment().tz(timeZone)
  const updateDate = dateNow.format("YYYY-MM-DD")
  const updateTime = dateNow.format("HH:mm:ss")
  const elements = items.map((item) => ({
    idMaterial: item.id.id ?? item.id_material,
    cantidad: operator === '-' ? -Number(item.nuevaCantidad ?? item.cantidad) : Number(item.nuevaCantidad ?? item.cantidad)
  }))
  return {
    fechaActualizacion: updateDate,
    horaActualizacion: updateTime,
    idEstado: status,
    idUsuario: userId === "SAME_USER" ? items[0].id_usuario : userId,
    elements
  }
  
}
export const mapMaterials = (items) => {
  const materials = {
    serializable: [],
    noSerializable: []
  }
  for (const item of items) {
    const newObject = {
      id: item.idMaterial,
      label: item.nombre
    }
    if (item.categoria === "EQUIPOS") materials.serializable.push(newObject)
    else materials.noSerializable.push(newObject)
  }
  return materials
}

export const mapUsers = (users) => {
  return users.map((user) => ({
    id: user.id,
    label: user.nombre
  }))
}
export const mapWorks = (works) => {
  return works.map((work) => ({
    id: work.id,
    label: work.tipoTrabajo
  }))
}

export const mapItemsToAssign = (idsSelected) => {
  return async (dispatch,getState) => {
    const { serializableInfo, noSerializableInfo } = getState().tableStock
    const elements = [...serializableInfo, ...noSerializableInfo];
      const newArray = idsSelected.map((id) => {
        const keepId = elements.find((item) => item.id === id)
        if (keepId) return keepId
        return elements.find((item) => item.id === id)
      })
      dispatch(updateItemsSelected(newArray))
  }
}
export const mapColsTableStock = (category, _status) => {
  const isSerializable = category === "1";
  const isStock = _status === "1";
  const isConsumed = _status === "3";
  const cols = [];
  cols.push({
    field: "fecha_cargue",
    headerName: "Fecha de Cargue",
    width: 220,
  })
  cols.push({
    field: "codigo",
    headerName: "Código",
    width: 180,
  });
  cols.push({
    field: "nombre",
    headerName: "Nombre",
    width: 180,
  });
  cols.push(
    isSerializable
      ? {
          field: "serial",
          headerName: "Serial",
          width: 220,
        }
      : {
          field: "cantidad",
          headerName: "Cantidad",
          width: 160,
        }
  );
  if (isStock) {
    cols.push({
      field: "estado",
      headerName: "Estado",
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Chip label={`${params.row.estado}`} color="success" />
        </Stack>
      ),
    });
  }
  cols.push({
    field: "usuario",
    headerName: "Usuario",
    width: 250,
  });
  if (isConsumed) {
    cols.push({
      field: "ot_number",
      headerName: "Número OT",
      width: 220,
    });
    cols.push({
      field: "account_number",
      headerName: "Número Cuenta",
      width: 220,
    });
  }
  cols.push({
    field: "fecha_actualización",
    headerName: "Fecha Actualizacion",
    width: 220,
    valueGetter: (params) =>
      `${moment(params.row.fecha_actualizacion).format('YYYY-MM-DD') || ""} ${
        params.row.hora_actualizacion || ""
      }`,
  });
  return cols
};
