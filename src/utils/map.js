import { Chip, Stack } from "@mui/material";

export const mapColsTableStock = (category, _status) => {
  const isSerializable = category === "1";
  const isStock = _status === "1";
  const isConsumed = _status === "3";
  const cols = [];
  const headerClass = "_table-header";
  const cellClass = "_table-cell";
  cols.push({
    field: "fecha_cargue",
    headerName: "Fecha de Cargue",
    width: 180,
    headerClassName: headerClass,
    cellClassName: cellClass,
  });
  cols.push({
    field: "codigo",
    headerName: "Código",
    width: 180,
    headerClassName: headerClass,
    cellClassName: cellClass,
  });
  cols.push({
    field: "nombre",
    headerName: "Nombre",
    width: 180,
    headerClassName: headerClass,
    cellClassName: cellClass,
  });
  cols.push(
    isSerializable
      ? {
          field: "serial",
          headerName: "Serial",
          width: 220,
          headerClassName: headerClass,
          cellClassName: cellClass,
        }
      : {
          field: "cant",
          headerName: "Cantidad",
          width: 160,
          headerClassName: headerClass,
          cellClassName: cellClass,
        }
  );
  if (isStock) {
    cols.push({
      field: "estado",
      headerName: "Estado",
      width: 120,
      headerClassName: "_table-header",
      cellClassName: "_table-cell",
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
    headerClassName: headerClass,
    cellClassName: cellClass,
  });
  if (isConsumed) {
    cols.push({
      field: "ot_number",
      headerName: "Número OT",
      width: 220,
      headerClassName: headerClass,
      cellClassName: cellClass,
    });
    cols.push({
      field: "account_number",
      headerName: "Número Cuenta",
      width: 220,
      headerClassName: headerClass,
      cellClassName: cellClass,
    });
  }
  cols.push({
    field: "fecha_actualizacion",
    headerName: "Fecha Actualizacion",
    width: 180,
    headerClassName: headerClass,
    cellClassName: cellClass,
    valueGetter: (params) =>
      `${params.row.fecha_actualizacion || ""} ${
        params.row.hora_actualizacion || ""
      }`,
  });
  return cols
};
