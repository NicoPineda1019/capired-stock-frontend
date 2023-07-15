import React, { useContext } from "react";
import AccordionStock from "../components/AccordionStock";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryTab } from "../store/inboxStock/inboxStockSlice";
import { useEffect } from "react";
import { getStockByStatusAndUser } from "../store/inboxStock/inboxStockThunk";
import { STATES } from "../constants";
import { Auth } from "../context/auth";
import { updateStockPending } from "../store/assignStock/assignStockThunk";

const StockDetailUserResponsive = () => {
  const dispatch = useDispatch();
  const auth = useContext(Auth);

  const { stockItemsIncoming, categoryTab } = useSelector(state => state.inboxStock)
  const handleChangeTab = (e, newValue) => {
    dispatch(setCategoryTab(newValue))
  }
  useEffect(() => {
    const user = auth.sesion?.idToken?.payload["email"].split("@")[0]
    dispatch(getStockByStatusAndUser(STATES.PENDIENTE, user))
  }, [categoryTab])
  
  return (
    <section className="_containers-card-responsive">
      <h5>Revisión de materiales</h5>
      <Box sx={{ margin: "10px 0px" }}>
        <TabContext value={categoryTab}>
          <Box >
            <TabList
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
              onChange={handleChangeTab}
            >
              <Tab label="SERIALIZABLE" value="1" />
              <Tab label="NO SERIALIZABLE" value="2" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <AccordionStock items={stockItemsIncoming}/>
      <button onClick={() => dispatch(updateStockPending())}>Guardar y enviar</button>
    </section>
  );
};

export default StockDetailUserResponsive;
