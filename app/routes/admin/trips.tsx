import { Headers } from 'components/index';
import type {Route} from "./+types/trips";
import {TripCard} from "components"
import { getAllTrips } from '~/appWrite/trips';
import {parseTripData} from "~/lib/utils"
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import { PagerComponent } from '@syncfusion/ej2-react-grids';
export const loader = async ({request}: Route.LoaderArgs) => {

    const limit = 8;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")|| "1", 10);
    const offset = (page - 1) * limit;
    
    const {allTrips, total} = await getAllTrips(limit, offset);
     return {
          trip: allTrips.map((({$id, tripDetail,imageUri })=> ({
               id: $id,
               ...parseTripData(tripDetail),
               imageUri: imageUri ?? []
          }))),
          total
        }
          
}    
export const trips= ({loaderData}: Route.ComponentProps) => {
const trips = loaderData.trip || [];
const [searchParams] = useSearchParams();
const initialPage= Number(searchParams.get("page") || "1");
const [currentPage, setPage ] = useState(initialPage);
const handleChange = (page: number) => {
  setPage(page);
  window.location.search = `?page=${page}`
}
  return (
    <main className='all-users wrapper'>
      <Headers title="Trips"
          description="find perfect trip with the help of AI"
          ctaText="create the trip"
          CtaUrl="/trips/create"/>

          <section>
            <h1 className='text-dark-100 p-24-semibold font-extrabold pl-7 mb-4'> Manage Created Trip</h1>

            <div className='trip-grid'>
              {trips.map((trip:any) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id}
                            name={trip.name}
                            imageUrls={trip.imageUri[0]}
                            location={trip.itinerary?.[0]?.location ?? ""}
                            tags={[trip.interests, trip.travelStyle]}
                            price={trip.estimatedPrice}
                        />
                    ))}
            </div>
            <PagerComponent 
            totalRecordsCount={loaderData.total}
            pageSize={8}
            currentPage={currentPage}
            click={(e)=> setPage(e.currentPage)}
            cssClass='1mb-4'
            />

          </section>
          </main>
  )
}

export default trips