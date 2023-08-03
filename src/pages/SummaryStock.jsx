import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSummaryStock } from "../store/summaryStock/summaryStockThunk";
import { formatValues } from "../utils/map";
import {
  updateEndDate,
  updateStartDate,
} from "../store/summaryStock/summaryStockSlice";

const SummaryStock = () => {
  const dispatch = useDispatch();
  const { startDate, endDate, itemsStock } = useSelector(
    (state) => state.summaryStock
  );

  useEffect(() => {
    dispatch(getSummaryStock());
  }, [dispatch]);

  return (
    <section className="_summaryStock-container">
      Resumen Inventario
      <div className="_summaryStock-box-dates">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha inicio"
            value={dayjs(startDate)}
            format="YYYY-MM-DD"
            onChange={(e) => dispatch(updateStartDate(e.format("YYYY-MM-DD")))}
          />
          <DatePicker
            label="Fecha fin"
            value={dayjs(endDate)}
            format="YYYY-MM-DD"
            onChange={(e) => dispatch(updateEndDate(e.format("YYYY-MM-DD")))}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={() => dispatch(getSummaryStock())}>Generar resumen</Button>
      </div>
      <div className="_summaryStock-container-table">
        {
          itemsStock.length > 0 &&
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
            {itemsStock.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{item.nombre} ({item.unidad})</th>
                <td>{formatValues(item.STOCK, item.PENDIENTE)}</td>
                <td>{item.ASIGNADO ?? 0}</td>
                <td>{item.CONSUMIDO ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>

        }
      </div>
    </section>
  );
};

export default SummaryStock;
