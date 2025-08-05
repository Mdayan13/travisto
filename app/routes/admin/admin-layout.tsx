import { Outlet, redirect } from 'react-router';
import { NavItems, MobileSidebar } from 'components';
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { getExistingUser, storeUserData } from '~/appWrite/auth';
import { account } from '~/appWrite/client';

export async function clientLoader() {
  try {
    console.log("clientLoader function is called");
    
    const user = await account.get();
    if (!user) return redirect("/sign-in");
         
    const existingUser = await getExistingUser(user.$id);
    
    if (existingUser?.status === "user") {
      return redirect("/");
    }
    return existingUser?.$id ? existingUser : await storeUserData();

  } catch (error) {
    console.log("the error in clientLoader :==", error);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #bae6fd 0%, #fed7aa 100%)',
      minHeight: '100vh',
      color: '#1e293b',
      display: 'flex',
      transition: 'background 0.5s ease',
    }}>
      <MobileSidebar />
      <aside style={{
        width: '100%',
        maxWidth: '270px',
        display: 'block',
        background: 'linear-gradient(to bottom, #93c5fd, #bae6fd)',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        transition: 'box-shadow 0.3s ease',
      }} className='lg:block hidden'>
        <SidebarComponent
          width="270px"
          style={{
            height: '100%',
            background: 'linear-gradient(to bottom, #60a5fa, #93c5fd)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }}
          enableGestures={false}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to bottom, #3b82f6, #60a5fa)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to bottom, #60a5fa, #93c5fd)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside style={{
        flex: 1,
        background: 'linear-gradient(to right, #fed7aa, #fef3c7)',
        padding: '24px',
        borderRadius: '8px',
        margin: '12px',
        color: '#1e293b',
      }}>
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;