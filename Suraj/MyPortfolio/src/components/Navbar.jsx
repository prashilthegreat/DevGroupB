import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 from-black via-red-700 to-black`}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to="/" className='flex items-center gap-2' onClick={() => { setActive(""); window.scrollTo(0, 0); }}>
          <img src={logo} alt="logo" className='w-13 h-9 object-contain hover:opacity-80 transition duration-300' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            <span className='text-bold animate-bounce'>SURAJ</span> &nbsp;
            <span className='animate-golden-glow'>| SURAJ KC</span>
          </p>

        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((navLink) => (
            <li
              key={navLink.id}
              className={`${active === navLink.title ? "text-red-500 underline" : "text-secondary"} hover:text-red-500 text-[18px] font-medium cursor-pointer transition duration-300`}
              onClick={() => setActive(navLink.title)}
            >
              <a href={`#${navLink.id}`}> {navLink.title}</a>
            </li>
          ))}
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt="menu"
            className={`w-[28px] h-[28px] hover:text-red-500 cursor-pointer transform transition-transform duration-300 ${toggle ? 'rotate-90' : 'rotate-0'}`}
            onClick={() => setToggle(!toggle)}
          />
          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-gradient-to-r from-red-500 to-red-700 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl transition-all duration-500 ease-in-out transform ${toggle ? 'translate-x-0' : 'translate-x-full'}`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((navLink) => (
                <li
                  key={navLink.id}
                  className={`${active === navLink.title ? "text-white underline" : "text-secondary"} font-poppins font-medium cursor-pointer text-[16px] hover:text-red-300 transition duration-300`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(navLink.title);
                  }}
                >
                  <a href={`#${navLink.id}`}> {navLink.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
