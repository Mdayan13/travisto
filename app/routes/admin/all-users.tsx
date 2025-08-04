import { Headers } from 'components/index';
import {GridComponent,  ColumnDirective, ColumnsDirective } from "@syncfusion/ej2-react-grids"
import { cn, formatDate } from '~/lib/utils';
import { getAlluser } from '~/appWrite/auth';
import type { Route } from './+types/all-users';

export const loader = async () =>{
  const {users, total} = await getAlluser(10, 0);
  return {users, total};
}

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users }  = loaderData;
  return (
    <main className='all-users wrapper'>
      <Headers title="Trips Page"
          descsription="track actvitivy, trends and popular destinations in real time"/>
      <GridComponent dataSource={users} gridLines='None'>
        <ColumnsDirective>
          <ColumnDirective 
          field='name'
          headerText='Name'
          textAlign='Left'
          width='180'
          template={(props: UserData)=> (
            <div className='item-center flex gap-1.5 px-4'><img src={props.imageUrl} alt="User" className='rounded-full size-8 aspect-square' referrerPolicy='no-referrer'/> 
            <span>{props.name}</span></div>
          )}
          />
        <ColumnDirective 
        field="email"
        headerText="Email"
        textAlign="Left"
        width='200'
        />
        <ColumnDirective 
        field="joinedAt"
        headerText="Date Joined"
        textAlign="Left"
        width='130'
        template={({joinedAt})=>(formatDate(joinedAt))}
        />
        <ColumnDirective 
        field="status"
        headerText="Type"
        textAlign="Left"
        width='100'
        template={({status}: UserData) => (
          <article className={cn("status-column",status == "user" ? "bg-green-50" : "bg-light-300")}>
            <div className={cn("size-1.5 rounded-full",status == "user" ? "bg-success-500" : "bg-gray-500")}/>
              <h3 className={cn("font-inter text-xs font-medium",status == "user" ? "text-success-700":"text-gray-500")}>
                {status}
              </h3>
          </article>
        )}
        />
        
        </ColumnsDirective>
      </GridComponent>
    </main>
  )
}

export default AllUsers