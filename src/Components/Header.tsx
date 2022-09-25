import React from "react";

const Header = () => {
  return (
    <div className='grid grid-cols-7 fixed w-full top-0 bg-white'>
      <div className='border text-center font-medium'>S</div>
      <div className='border text-center font-medium'>M</div>
      <div className='border text-center font-medium'>T</div>
      <div className='border text-center font-medium'>W</div>
      <div className='border text-center font-medium'>T</div>
      <div className='border text-center font-medium'>F</div>
      <div className='border text-center font-medium'>S</div>
    </div>
  );
};

export default Header;
