import React, { useContext } from "react";
import { Auth } from "../context/auth";
import { useEffect } from "react";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Fab } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryTab,
  setStatusTab,
} from "../store/tableStock/tableStockSlice";
import { mapColsTableStock } from "../utils/map";
import { getStockByStatus } from "../store/tableStock/stockThunk";
import { useNavigate } from "react-router-dom";

const StockDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    serializableInfo,
    noSerializableInfo,
    categoryTab,
    statusTab,
    numberPage,
    currentPage,
    loading,
  } = useSelector((state) => state.tableStock);
  const { stockItemsSelected } = useSelector((state) => state.assignStock);

  const handleCategoryTab = (e, newValue) => {
    dispatch(setCategoryTab(newValue));
  };
  const handleStatusTab = (e, newValue) => {
    dispatch(setStatusTab(newValue));
  };

  useEffect(() => {
    dispatch(getStockByStatus(currentPage, statusTab));
  }, [currentPage, statusTab, dispatch, categoryTab]);

  return (
    <section className="_stock-content">
      <div style={{ marginTop: "20px", width: "90%" }}>
        <Box className="_table-header">
          <TabContext value={categoryTab}>
            <Box sx={{ borderBottom: 1 }}>
              <TabList
                onChange={handleCategoryTab}
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label="SERIALIZABLE" value="1" />
                <Tab label="NO SERIALIZABLE" value="2" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <Box className="_table-header">
          <TabContext value={statusTab}>
            <Box sx={{ borderBottom: 1 }}>
              <TabList
                onChange={handleStatusTab}
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label="STOCK" value="1" />
                <Tab label="ASIGNADO" value="2" />
                <Tab label="CONSUMIDO" value="3" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <Table
          cols={mapColsTableStock(categoryTab, statusTab)}
          rows={categoryTab === "1" ? serializableInfo : noSerializableInfo}
          numberPage={numberPage}
          currentPage={currentPage}
          loading={loading}
        />
        {
          stockItemsSelected.length > 0 &&
        <Fab 
          variant="extended" 
          onClick={() => {
            navigate('/admin/assign')
          }}>
          {`Continuar Asignación (${stockItemsSelected.length})`}
          <ArrowForwardIosIcon sx={{ mr: 1 }} />
        </Fab>
        }
      </div>
      {/*       <button onClick={() => {
        auth?.cognitoUser?.signOut()
        auth?.cognitoUser?.globalSignOut({
          onSuccess: () => ({}),
          onFailure: () => ({})
        })}
        }>Salir</button>
 */}{" "}
    </section>
  );
};

export default StockDetail;
