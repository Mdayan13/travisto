import React from 'react'
import {Link} from "react-router";
import NavItems from "./NavItems";
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
const MobileSidebar = () => {
     let sidebar: SidebarComponent;
     const handleeClck = ()=> {
          sidebar.toggle();
     }
  return (
    <div className='mobile-sidebar wrapper'>
     <header>
          <Link to="/" >
          <img src="/assets/icons/logo.svg"
          alt="Logo" className='size-[30px]'/>
          <h1>Tourvisto</h1>
          </Link>

          <button onClick={handleeClck} >
               <img src="/assets/icons/menu.svg"
               alt='Logo'
               className='size-7'/>
          </button>
     </header>
     <SidebarComponent 
     ref={(sider) => sidebar = sider}
     width={270}
     closeOnDocumentClick={true}
     showBackdrop={true}
     created={() => {sidebar.hide()}}
     type='over' >
          <NavItems handleClck={handleeClck}/>
     </SidebarComponent>
    </div>
  )
}

export default MobileSidebar