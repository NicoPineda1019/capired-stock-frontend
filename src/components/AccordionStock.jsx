import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const mock = [
  {
    id: 90,
    codigo: "4022728",
    nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
    serial: "SERIAL234523463465",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
  {
    id: 91,
    codigo: "4019461",
    nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
    serial: "SERIAL123562364",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
  {
    id: 90,
    codigo: "4022728",
    nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
    serial: "SERIAL234523463465",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
  {
    id: 91,
    codigo: "4019461",
    nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
    serial: "SERIAL123562364",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
  {
    id: 90,
    codigo: "4022728",
    nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
    serial: "SERIAL234523463465",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
  {
    id: 91,
    codigo: "4019461",
    nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
    serial: "SERIAL123562364",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
  {
    id: 90,
    codigo: "4022728",
    nombre: "EMTA WF B/G/N TC7300 D3 LIN2 LAN4 TECN",
    serial: "SERIAL234523463465",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
  {
    id: 91,
    codigo: "4019461",
    nombre: "AMPLIFICADOR INTERNO (REF HCDA-1 FRA)",
    serial: "SERIAL123562364",
    fecha_cargue: "2023-06-17T15:30:57.000Z",
    fecha_actualizacion: "2023-06-17T00:00:00.000Z",
    hora_actualizacion: "15:30:57",
    estado: "STOCK",
    usuario: null,
    confirmacion_cargue: "SI",
  },
];
const AccordionStock = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <section className="_accordionStock-container">
      
      {mock.map((item, idx) => (
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
            <FormControl
              sx={{
                fontSize: "1em",
              }}
            >
              <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel
                  value="1"
                  disableTypography
                  control={<Radio size="small" />}
                  label="Aceptar"
                />
                <FormControlLabel
                  disableTypography
                  value="2"
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
