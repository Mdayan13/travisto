import { Headers, TripCard,StatsCard  } from 'components/index';
import {DashBoardStats, allTrips, users, user} from "~/lib/utils"
import type { Route } from './+types/admin-layout';
import { getUser } from '~/appWrite/auth';

const {totalUsers, UserJoined, totalTrips, tripsCreated,userRole } = DashBoardStats;
export const clientLoader = async () => await getUser();

const dashboard = ({loaderData}: Route.ComponentProps) => {
  const user = loaderData as User || null;

  return (
    <main className='dashboard wrapper'>
      <Headers title={`Welcome ${user?.name ?? 'Guest'} 🥷`}
      descsription="track actvitivy, trends and popular destinations in real time"/>
      <section className='flex flex-col gap-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
              <StatsCard headeTitle="Total Users"
                          total={totalUsers}
                          CurrentMonthCount={UserJoined.currentMonth} 
                          LastMonthCount={UserJoined.lastMonth} 
                          />
              <StatsCard headeTitle="Totle Trips"
                          total={totalTrips}
                          CurrentMonthCount={tripsCreated.currentMonth} 
                          LastMonthCount={tripsCreated.lastMonth} 
                          />
              <StatsCard headeTitle="Active Users TOday"
                          total={userRole.total}
                          CurrentMonthCount={userRole.currentMonth} 
                          LastMonthCount={userRole.lastMonth} 
                          />
          </div>
      </section>
      <section>
        <h1 className='text-xl font-semibold text-dark-100'>Created Trips</h1>
        <div className='trip-grid'>
          {allTrips.slice(0, 4).map(({
            id, name, imageUrls, itinerary, tags, estimatedPrice
          }) => (
            <TripCard
              key={id}
              id={id.toString()}
              name={name}
              imageUrls={imageUrls[0]}
              location={itinerary?.[0]?.location?? ''}
              tags={tags}
              price={estimatedPrice}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default dashboard