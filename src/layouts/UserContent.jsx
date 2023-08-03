import React from 'react'
import { Outlet } from 'react-router-dom'
import AppBarNav from '../components/AppBarNav'

const UserContent = () => {
  return (
    <section className="_stock-container-row">
      <AppBarNav />
      <Outlet />
    </section>
  )
}

export default UserContent