import React from 'react';
import { IoSearch } from "react-icons/io5";

function Search() {
  return (
    <div className="w-full px-6 py-6 items-center overflow-hidden rounded-full flex gap-4 h-[43px] border-4 border-stone-[rgba(97, 97, 97, 1)]">
        <IoSearch className="w-[25px] h-[25px] transform scale-150" style={{ color: 'rgba(97, 97, 97, 1)' }} />
        <div className='flex flex-col justify-center'>
            <p className="font-bold" style={{ color: 'rgba(97, 97, 97, 1)' }}>
                SEARCH
            </p>
            <p className='font-light' style={{ color: 'rgba(97, 97, 97, 1)' }}>what do you want today? (eg.: burger, fries etc)</p>
        </div>
    </div>
  )
}

export default Search;

