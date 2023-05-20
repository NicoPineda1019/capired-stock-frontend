import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const MenuContent = () => {
  return (
    <section className="_stock-container">
      <SideBar />
      <Outlet />
    </section>
  )
}

export default MenuContent