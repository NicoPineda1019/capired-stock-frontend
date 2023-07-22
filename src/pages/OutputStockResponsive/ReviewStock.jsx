import React from 'react'
import { useDispatch } from "react-redux";
import { Box, Button } from '@mui/material'
import AccordionStock from '../../components/AccordionStock'
import { nextStep, previousStep } from '../../store/stepperStock/stepperStockSlice';

const items = [
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
    { serial: 1},
]
const ReviewStock = () => {
    const dispatch = useDispatch();

  return (
    <div>
        <AccordionStock items={items}/>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => dispatch(nextStep())}
            sx={{ mt: 1, mr: 1 }}
          >
            Continuar
          </Button>
          <Button
            onClick={() => dispatch(previousStep())}
            sx={{ mt: 1, mr: 1 }}
          >
            Volver
          </Button>
        </Box>
    </div>
  )
}

export default ReviewStock