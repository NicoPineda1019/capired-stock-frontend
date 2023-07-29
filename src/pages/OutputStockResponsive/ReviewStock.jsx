import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from '@mui/material'
import AccordionStock from '../../components/AccordionStock'
import { nextStep, previousStep } from '../../store/stepperStock/stepperStockSlice';
import { useEffect } from 'react';

const ReviewStock = () => {
    const dispatch = useDispatch();
    const { itemsStock } = useSelector(
      (state) => state.outputStock
    );
  
  return (
    <div>
        <AccordionStock items={itemsStock} configurations={{hasAddConsumption: true}}/>
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