import { getAllTrips, getTripById } from "~/appWrite/trips"
import { Headers, TripCard } from "components";
import type { Route } from "./+types/trip-detail";
import {  cn, parseTripData } from "~/lib/utils";
import InfoPill from "components/infopill";
import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";

export const loader = async ({params}: Route.LoaderArgs) => {
     const {tripId} = params
     console.log(tripId);
     if(!tripId) throw new Error ("Trip Id Is  not Passeds");
     const [trips,trip ] = await Promise.all([
          getAllTrips(2, 0),
          getTripById(tripId),
     ]
     )
     return {
          trip,
          alltrips: trips.allTrips.map((({$id, tripDetail,imageUri })=> ({
               id: $id,
               ...parseTripData(tripDetail),
               imageUri: imageUri ?? []
          })))}
}    
export default function TripDetail({loaderData}: Route.ComponentProps){

     const imageurls = loaderData?.trip?.imageUri || [];
     const allTrips = loaderData.alltrips  || [];
     const tripData = parseTripData(loaderData?.trip?.tripDetail);
     const { name,duration,groupType,description,weatherInfo,interests,travelStyle,bestTimeToVisit,budget,country,itinerary, estimatedPrice} = tripData || {};
     const pillItems = [
          {textx:interests, bg:"!bg-blue-200 !text-blue-600" },
          {textx:travelStyle, bg:"!bg-green-200 !text-green-600" },
          {textx:budget, bg:"!bg-pink-200 !text-pink-600" },
          {textx:country, bg:"!bg-red-200 !text-red-600" },
     ]
     console.log("errererrrrrrrrr",allTrips)
     const visitTimeAndWeatherInfo = [
          {title: "Best Time To Visit", item: bestTimeToVisit},
          {title: "Weather", item: weatherInfo}
     ]
     return (
    <main className="wrapper travel-detail">
          <Headers title="trip Detail " description="get Ai powered trip Details and Edit them" />
          <section className="container wrapper-md">
               <header>
                    <h1 className="p-40-semibold text-dark-100">{name}</h1>
                    <div className="flex items-center gap-5">
                         <InfoPill 
                              text={`${duration} days trip`}
                              image="/public/assets/icons/calendar.svg"
                              />
                         <InfoPill 
                              text={`${itinerary?.slice(0,4).map((item)=> item.location).join(",") || ''}`}
                              image="/public/assets/icons/location-mark.svg"
                              />
                    </div>
               </header>
               <section className="gallery">
                    {imageurls.map((url : string,index: number) => (
                         <img key={index} src={url} alt="Image"
                         className={cn("w-full object-cover rounded-2xl",index == 0 ?"h-[330px] md:col-span-2 md:row-span-2" : "m:row-span-1 h-[150px]" )}
                    />
                    ))}
               </section>
               <section className="flex gap-3 md:gp-5 item-center flex-wrap">
                    <ChipListComponent className="travel-chip">
                         <ChipsDirective>
                              {pillItems.map((pill,index) => (
                                   <ChipDirective 
                                   key={index}
                                   text={pill.textx}
                                   cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                                   />
                              ))}
                         </ChipsDirective>
                    </ChipListComponent>
                    <ul className="flex items-center gap-1">
                         {Array(5).fill(null).map((_, index) => (
                              <li key={index}>
                                   <img src='/public/assets/icons/star.svg' alt="star" className="size-[18px]" />
                              </li>
                         ))}
                         <li className="ml-1">
                              <ChipListComponent>
                                   <ChipsDirective>
                                        <ChipDirective 
                                             text="4.7/5"
                                             cssClass="!bg-yellow-50 font-bold font-weight-700 !text-yellow-700"
                                        />
                                   </ChipsDirective>
                              </ChipListComponent>
                         </li>
                    </ul>
               </section>
               <section className="title">
                    <article>
                         <h3>
                              {duration}-Day {country} {travelStyle}
                         </h3>
                         <p>
                              {budget}, {groupType} and {interests}
                         </p>
                    </article>
                    <h2 className="font-semibold text-lg md:text-xl text-dark-100">{estimatedPrice}</h2>
               </section>
               <p className="font-normal text-xs md:text-lg text-dark-400">{description}</p>
               <ul className="itinerary">
                    {itinerary?.map((dayPlan,index) => (
                         <li key={index}>
                              <h3 className="font-extrabold text-zinc-950 bg-blue-500 h-13 flex-col content-center pl-4.5 rounded-full">Day {dayPlan.day}:- {dayPlan.location}</h3>
                              <ul >{dayPlan.activities.map((ActivityHandling, index)=>(
                                   <li key={index}>
                                        <span className="flex-shring-0 font-bold pl-5 text-amber-950">{ActivityHandling.time}:-</span>
                                        <p className=" flex-grow font-serif text-gray-700">{ActivityHandling.description}</p>
                                   </li>
                          ))}</ul>
                         </li>
                    ))}
               </ul>
               {visitTimeAndWeatherInfo.map((section) => (
                    <section key={section.title} className="visit">
                         <div>
                              <h2 className="font-bold bg-purple-500 flex-col content-center pl-6 text-2xl h-14 rounded-full">{section.title}</h2>
                              <ul>
                                   {section.item?.map((item)=> (
                                        <li key={item}>
                                             <p className="pl-6 flex-grow">{item}</p>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                    </section>
               ))}
          </section>
          <section className="flex flex-col gap-6">
               <h2 className="p-24-semib0ld font-extrabold h-10 bg-green-300 pl-8 flex-col content-center rounded-3xl text--dark-100">
               Popular Trips
               </h2>
               <div className="trip-grid">
                    {allTrips.map((trip:any) => (
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
          </section>
    </main>
  )
}