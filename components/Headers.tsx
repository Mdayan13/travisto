import React from 'react'
import { useLocation } from 'react-router';
import { cn } from '~/lib/utils';

interface props {
     title: string;
     descsription: string;
}
const location = useLocation;
const Headers = ({title, descsription}:props) => {
  return (
     <header className='header'>
          <article>
               <h1 className={cn('text-dark-200', location.pathname == "/"?'text-2xl md:text-4xl font-bold' :
                    'text-xl md:text-2xl font-semibold'
               )}>{title}</h1>
               <p className={cn('text-gray-100 font-normal', location.pathname == "/"?'text-base md:text-lg':
                    'md:text-lg text-sm'
               )}>{descsription}</p>
          </article>
     </header>
  )
}

export default Headers