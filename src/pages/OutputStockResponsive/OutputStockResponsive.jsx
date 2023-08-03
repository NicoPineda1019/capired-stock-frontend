import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepperStock from "../../components/StepperStock";
import { setWorks } from "../../store/outputStock/outputStockSlice";
import { getAllStockByStatus, getWorks } from "../../store/outputStock/outputStockThunk";
import { Auth } from "../../context/auth";
import { STATES } from "../../constants";

const OutputStockResponsive = () => {
  const dispatch = useDispatch()
  const auth = useContext(Auth);
  const { refresh } = useSelector(state => state.outputStock)

  useEffect(() => {
    const user = auth.sesion?.idToken?.payload["email"].split("@")[0]
    const worksInStorage = JSON.parse(sessionStorage.getItem("works"));
    if (worksInStorage)
      dispatch(setWorks(worksInStorage));
    else dispatch(getWorks());
    dispatch(getAllStockByStatus(1,STATES.ASIGNADO,user,500))
  }, [dispatch, refresh])
  
  return (
    <section className="_outputStock-container">
      <h3>Crear Consumo</h3>
      <StepperStock />
    </section>
  );
};

export default OutputStockResponsive;
