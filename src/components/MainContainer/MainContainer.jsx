import React from 'react';
import Head from '../Header/Head';
import Sidebar from '../Sidebar/Sidebar';
import MidComponent from './MidComponent/MidComponent';


const MainContainer = () => {
  return (
    <div>
      <Head/>
      <Sidebar/>
      <MidComponent/>
    </div>
  )
}

export default MainContainer
