import React from 'react';
import { Outlet } from 'react-router';
import { NavItems, MobileSidebar } from 'components';
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
const AdminLayout = () => {
  return (
    <div className='admin-layout'>
     <MobileSidebar/>
     <aside className='w-full max-w-[270px] lg:block hidden'>
          <SidebarComponent  width="270px" className='h-full' enableGestures={false}>
               <NavItems/>
          </SidebarComponent>
     </aside>
     <aside className='children'>
          <Outlet/>
     </aside>
    </div>
  )
}

export default AdminLayout