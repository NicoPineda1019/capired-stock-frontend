import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { updateStockItemsIncoming } from "../store/inboxStock/inboxStockSlice";

const AccordionStock = ({items}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleRadioButtonChange = (e, currentItem) => {
    dispatch(updateStockItemsIncoming({
      ...currentItem,
      _state: e
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
              background: '#5b18ff',
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
            <p>
              <label className="_accordionStock-header">Serial</label>
              <span>{item.serial}</span>
            </p>
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
            <p>
              <label className="_accordionStock-header">
                Cantidad
              </label>
              <span>{item.cantidad}</span>
              
            </p>
            <FormControl
              sx={{
                fontSize: "1em",
              }}
            >
              <RadioGroup row name="row-radio-buttons-group"
                value={item._state ?? ""}
                onChange={(e) => handleRadioButtonChange(e.target.value, item)}
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
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
};

export default AccordionStock;
