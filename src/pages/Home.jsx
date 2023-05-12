import React, { useContext } from 'react'
import { Auth } from '../context/auth'
import { useEffect } from 'react'
import SideBar from '../components/SideBar'
import Table from '../components/Table'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react'

const Home = () => {
  const auth = useContext(Auth)
  const [value, setValue] = useState('1')
  console.log('auth', auth)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
/*     fetch('https://8oxhxp1tr0.execute-api.us-east-1.amazonaws.com/dev/stock/serializable', {
      headers: {
        Authorization: auth.sesion.accessToken.jwtToken
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
 */  }, [])

  return (
    <section className='_stock-container'>
      <SideBar />
      <div className='_stock-content'>
        <div className='_stock-box-summary'>
          <div></div>
          <div>Stock</div>
          <div>Asignado</div>
          <div>Consumido</div>
          <div>Equipos</div>
          <div>45</div>
          <div>25</div>
          <div>14</div>
          <div>Cable</div>
          <div>45</div>
          <div>25</div>
          <div>14</div>
          <div>Material</div>
          <div>45</div>
          <div>25</div>
          <div>14</div>
        </div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Inventario" value="1" />
                <Tab label="Salida" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
        <Table />

      </div>
      {/*       <button onClick={() => {
        auth?.cognitoUser?.signOut()
        auth?.cognitoUser?.globalSignOut({
          onSuccess: () => ({}),
          onFailure: () => ({})
        })}
        }>Salir</button>
 */}    </section>
  )
}

export default Home