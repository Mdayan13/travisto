import { useLocation, Link } from 'react-router-dom';
import React from 'react'
import {ChipDirective, ChipListComponent, ChipsDirective} from "@syncfusion/ej2-react-buttons"
import { cn, getFirstWord } from '~/lib/utils';
interface TripCardProps{
  id:number;
  name:string;
  imageUrls: string;
  tags: string;
  location: string;
  price:string
}
const TripCard = ({id, name, imageUrls, tags, location, price}:TripCardProps ) => {
  const path = useLocation();
  return (
    <Link className='trip-card' to={path.pathname == '/' || path.pathname.startsWith("/travel") ?`/travel/${id}` : `/trips/${id}` }>
    <img src={imageUrls} alt={name} />
    <article>
      <h2>{name}</h2>
      <figure>
        <img src="/assets/icons/location-mark.svg" alt="locationMark" className='size-4'/>
        <figcaption>{location}</figcaption>
      </figure>
      </article>
      <div className='mt-5 pl-[18px] pr-3.5 pb-5'>
        <ChipListComponent id="travel-chip" >
          <ChipsDirective>
          {tags.map((tag, index) => (
            <ChipDirective  
            key={index}
            text={getFirstWord(tag)}
            cssClass={
              cn(index == 1 
                ? '!bg-pink-200 !font-semibold !text-pink-500' 
                : "!bg-success-500 !font-semibold !text-success-600"
              )}
            />
          ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
      <article className='tripCard-pill'>{price}</article>
      </Link>
    )
}

export default TripCard