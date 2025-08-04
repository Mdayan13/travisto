import React from 'react'
import { calculateTrendPercentage, cn } from '~/lib/utils';
interface StatssCard{
  headeTitle: string;
  total: number | string;
  CurrentMonthCount : number;
  LastMonthCount : number;
}

const StatsCard = ({headeTitle, total, CurrentMonthCount, LastMonthCount}: StatssCard) => {

  const{trend, percentage  } = calculateTrendPercentage(CurrentMonthCount, LastMonthCount);
  const Isdecerement = trend == "decrement";

  return (
    <article className='stats-card'>
      <h3 className='text-base font-medium'>
      {headeTitle}
      </h3>
      <div className='content'>
        <div className='flex flex-col gap-4'>
              <h2 className='text-4xl font-semibold'>{total}</h2>
              <div className='flex items-center gap-2'>
                  <figure className='flex items-center gap-1'>
                      <img src={`/assets/icons/${Isdecerement? "arrow-down-red.svg" : "arrow-up-green.svg"}`} alt='Arrow' className='size-5'/>
                      <figcaption className={cn("text-sm font-medium", Isdecerement ? 'text-red-500' : "text-green-700")}>{Math.round(percentage)}%</figcaption>
                  </figure>
                      <p className='text-sm text-gray-100 font-medium truncate'> vs Last Month</p>
              </div>
              <img src={`/assets/icons/${Isdecerement ? "decrement.svg" : "increment.svg"}`} 
              alt='Chart-Arrow' className='xl:h-full md:h-32 h-full w-full xl:w-32 ' />
        </div>
      </div>
    </article>
  )
}

export default StatsCard