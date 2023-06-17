import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";

const mock = [
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4051601",
    nombre: "MTA WF DUAL CGA2121CLC LIN2 LAN4 TECN",
  },
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4033321",
    nombre: "DECO DVBC-I-HD DCI420CLC S/C CTI TECN",
  },
  {
    stock: 99,
    assigned: 456,
    consumed: 489,
    codigo: "4061944",
    nombre: "SWITCH DGS-105 5P 10/100/1000 DLIK",
  },
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4051601",
    nombre: "MTA WF DUAL CGA2121CLC LIN2 LAN4 TECN",
  },
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4033321",
    nombre: "DECO DVBC-I-HD DCI420CLC S/C CTI TECN",
  },
  {
    stock: 99,
    assigned: 456,
    consumed: 489,
    codigo: "4061944",
    nombre: "SWITCH DGS-105 5P 10/100/1000 DLIK",
  },
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4051601",
    nombre: "MTA WF DUAL CGA2121CLC LIN2 LAN4 TECN",
  },
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4033321",
    nombre: "DECO DVBC-I-HD DCI420CLC S/C CTI TECN",
  },
  {
    stock: 99,
    assigned: 456,
    consumed: 489,
    codigo: "4061944",
    nombre: "SWITCH DGS-105 5P 10/100/1000 DLIK",
  },
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4051601",
    nombre: "MTA WF DUAL CGA2121CLC LIN2 LAN4 TECN",
  },
  {
    stock: 1,
    assigned: 456,
    consumed: 489,
    codigo: "4033321",
    nombre: "DECO DVBC-I-HD DCI420CLC S/C CTI TECN",
  },
  {
    stock: 99,
    assigned: 456,
    consumed: 489,
    codigo: "4061944",
    nombre: "SWITCH DGS-105 5P 10/100/1000 DLIK",
  },
];

const SummaryStock = () => {
  return (
    <section className="_summaryStock-container">
      Resumen Inventario
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Fecha inicio" />
        <DatePicker label="Fecha fin" />
      </LocalizationProvider>
      <div className="_summaryStock-container-table">
        <table className="_summaryStock-box-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Stock</th>
              <th scope="col">Asignado</th>
              <th scope="col">Consumido</th>
            </tr>
          </thead>
          <tbody>
            {mock.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{item.nombre}</th>
                <td>{item.stock}</td>
                <td>{item.assigned}</td>
                <td>{item.consumed}</td>
              </tr>
            ))}
            {/*                 <tr>
                    <th scope='row'>MTA WF DUAL CGA2121CLC LIN2 LAN4 TECN</th>
                    <td>598</td>
                    <td>1</td>
                    <td>25</td>
                </tr>
                <tr>
                    <th scope='row'>MTA WF DUAL CGA2121CLC LIN2 LAN4 TECN</th>
                    <td>598</td>
                    <td>1</td>
                    <td>25</td>
                </tr> */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SummaryStock;
