import { Outlet, redirect } from 'react-router';
import { NavItems, MobileSidebar } from 'components';
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import { getExistingUser, storeUserData } from '~/appWrite/auth';
import { account } from '~/appWrite/client';

export async function clientLoader(){
     try{
          const user = await account.get();
          const existingUser = await getExistingUser(user.$id);
          console.log(`user is ${user} and it satus is ${existingUser?.status === "user"} `)
          if(!user) return redirect("/sign-in")
          
               if(existingUser?.status === "user"){
                    return redirect("/");
               }
               return existingUser?.$id ? existingUser : await storeUserData();

     }catch(error){
          console.log("the error in clientLoader :==", error);
          return redirect("/sign-in")
     }
}
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