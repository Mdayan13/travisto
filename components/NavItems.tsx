import React from 'react';
import { sidebarItems } from '../app/constants/index';
import { Link, NavLink } from 'react-router';
import { cn } from '~/lib/utils';

const NavItems = ({handleClck}: {handleClck?:() => void}) => {
  const user = {
    name: 'anon',
    email: 'mdayan 1qaz@gmail.com',
    imageURI: '/assets/images/david.webp',
  };

  return (
    <section className='nav-items'>
      <Link to='/' className='link-logo'>
        <img src='/public/assets/icons/logo.svg' alt='logo' className='size-[30px]' />
        <h1>TourVisto</h1>
      </Link>

      <div className='container'>
        <nav>
          {sidebarItems.map(({ id, label, icon, href }) => (
            <NavLink to={href} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn('group nav-item', {
                    'br-primary-100 text-white': isActive,
                  })} onClick={handleClck} >
                  <img
                    src={icon}
                    alt={label}
                    className={`group-hover:brightness-0 group-hover:invert size-0 ${
                      isActive ? 'brightness-0 invert' : 'text-dark-200'
                    }`}
                  />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <footer className='nav-footer'>
          <img src={user?.imageURI || '/assets/images/david.webp'} alt={user?.name || 'David'} />
          <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </article>
          <button
            onClick={() => {
              console.log('logout clicked');
            }}
            className='cursor-pointer'
          >
            <img src='/public/assets/icons/logout.svg' alt='Logout' className='size-[6px]' />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
