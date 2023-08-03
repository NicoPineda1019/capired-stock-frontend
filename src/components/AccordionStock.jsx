import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { updateStockItemsIncoming } from "../store/inboxStock/inboxStockSlice";
import { updateItemsStock } from "../store/outputStock/outputStockSlice";

const AccordionStock = ({ items, configurations }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleRadioButtonChange = (e, currentItem) => {
    dispatch(
      updateStockItemsIncoming({
        ...currentItem,
        _state: e,
      })
    );
  };
  const handleAddConsumption = (currentItem, value) => {
    dispatch(updateItemsStock({
      ...currentItem,
      isConsumed: value
    }))
  }
  const handleNewQuantity = (e, currentItem) => {
    let value = e.target.value > currentItem.cantidad || e.target.value < 0 ? currentItem.cantidad : e.target.value;
    dispatch(updateItemsStock({
      ...currentItem,
      nuevaCantidad: value
    }))

  }
  return (
    <section className="_accordionStock-container">
      {items.map((item, idx) => (
        <Accordion
          key={idx}
          expanded={expanded === idx}
          onChange={handleChange(idx)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              background: "#5b18ff",
              color: "whitesmoke",
              fontSize: "1em",
            }}
          >
            {item.nombre}
          </AccordionSummary>
          <AccordionDetails
            sx={{
              fontSize: "0.8em",
            }}
          >
            {
              configurations?.hasAddConsumption &&
              <>
              <label className="_accordionStock-header">
                Agregar a consumo
              </label>
              <FormControlLabel control={<Switch size="small" checked={!!item.isConsumed} onChange={(e,value) => handleAddConsumption(item,value, )} />} />
              </>
            }
            <p>
              <label className="_accordionStock-header">
                Fecha de Asignación
              </label>
              <span>
                {moment(item.fecha_actualizacion).format("YYYY-MM-DD") +
                  " " +
                  item.hora_actualizacion}
              </span>
            </p>
            {!!item.serial && (
              <p>
                <label className="_accordionStock-header">Serial</label>
                <span>{item.serial}</span>
              </p>
            )}
            {!!item.cantidad && (
              <p>
                <label className="_accordionStock-header">Cantidad</label>
                <span>{item.cantidad}</span>
              </p>
            )}
            {configurations?.requireRadioGroup && (
              <FormControl
                sx={{
                  fontSize: "1em",
                }}
              >
                <RadioGroup
                  row
                  name="row-radio-buttons-group"
                  value={item._state ?? ""}
                  onChange={(e) =>
                    handleRadioButtonChange(e.target.value, item)
                  }
                >
                  <FormControlLabel
                    value="accept"
                    disableTypography
                    control={<Radio size="small" />}
                    label="Aceptar"
                  />
                  <FormControlLabel
                    disableTypography
                    value="return"
                    control={<Radio size="small" />}
                    label="Devolver"
                  />
                </RadioGroup>
              </FormControl>
            )}
            {
              (configurations?.hasAddConsumption && !!item.cantidad) &&
              <>
              <label className="_accordionStock-header">Cantidad a consumir</label>
              <TextField
                size="small"
                id="outlined-read-only-input-cantd"
                placeholder="Cantidad"
                type={"number"}
                value={item.nuevaCantidad === undefined ? '' : item.nuevaCantidad}
                onChange={(e) => handleNewQuantity(e,item)}
                InputProps={{
                  inputProps: {
                    max: item.cantidad,
                    min: 1,
                  },
                }}
              />
              </>

            }
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
};

export default AccordionStock;
