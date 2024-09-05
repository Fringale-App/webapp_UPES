import React, { useState,useEffect } from 'react';
import popup from '../../Images/popup.png'

function PopUp({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
          const timer = setTimeout(() => {
            onClose();
          }, 2000); // Close after 4 seconds
    
          return () => clearTimeout(timer); // Clear the timeout if the component unmounts
        }
      }, [isOpen, onClose]);
    return (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
            isOpen ? 'visible' : 'invisible'
          } transition-opacity duration-300`}
          onClick={onClose}
        >
          <div
            className={`absolute top-1/2 flex flex-col items-center justify-center left-1/2 w-60 h-60 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg ${
              isOpen ? 'scale-100' : 'scale-0'
            } transition-transform duration-500 ease-in-out`}
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the popup
          >
            <img src={popup} alt="" />
            <p className='font-bold text-sm'>It's a match! Go grab it now</p>
            <p className='font-semibold text-center text-xs'>Also, it has been added to your favorites.</p>
          </div>
        </div>
      );
}
export default PopUp;