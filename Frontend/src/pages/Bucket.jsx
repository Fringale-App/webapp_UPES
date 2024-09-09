import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBucket } from '../redux/food/foodSlice.jsx';
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Bucket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the current user and the user's bucket from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const bucket = useSelector((state) => state.food.bucket);

  const handleRemove = (item) => {
    if (item && item.name) {
      dispatch(removeFromBucket(item));
    }
  };

  return (
    <div className="p-4">
      {!currentUser ? (
        <p>Please log in to access your favorite section.</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Your Bucket</h1>
          {bucket && bucket.length > 0 ? (
            <div className='flex flex-col gap-2'>
              {bucket.map((item, index) => (
                item ? (
                  <div key={index} className="border rounded-lg shadow-sm">
                    <div className="flex pt-2 gap-2">
                      <div className='w-[105px] flex items-center justify-center h-[130px] overflow-hidden'>
                        <img
                          src={item?.image || "https://via.placeholder.com/150"}
                          alt={item?.name || "Unknown Item"}
                          className="w-full h-2/3 rounded-md"
                        />
                      </div>

                      <div className='w-[189px] flex flex-col gap-2 h-[150px]'>
                        <div className='flex gap-2'>
                          <div
                            className={`flex justify-center items-center w-4 h-4 border rounded-sm ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}
                            ></div>
                          </div>
                          <h3 className="text-sm font-medium">{item?.name || "Unnamed Item"}</h3>
                        </div>
                        <p className="text-gray-600 text-xs font-normal">{item?.description || "No description available."}</p>
                        <div className='flex justify-between pr-3 pb-3'>
                          <div className='flex justify-start items-center text-[14px] font-semibold text-[#212121]'>
                            <FaRupeeSign />
                            {item.price}
                          </div>
                          <button
                            onClick={() => handleRemove(item)}
                            className="bg-red-500 text-xs px-2 py-1 text-white rounded-md"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          ) : (
            <p>Your bucket is empty.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Bucket;

