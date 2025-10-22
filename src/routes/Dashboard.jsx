import React from 'react'
import Header from '../components/collector/dashboard/Header'
import Requests from '../components/collector/dashboard/Requests'

function Dashboard() {
  return (
    <div className='overflow-x-hidden'>
      <Header/>
      <Requests/>
    </div>
  )
}

export default Dashboard
