// Bucket.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBucket } from '../redux/food/foodSlice';
import { FaRupeeSign } from "react-icons/fa";

const Bucket = () => {
  const dispatch = useDispatch();
  const bucket = useSelector((state) => state.food.bucket);

  const handleRemove = (itemId) => {
    console.log("Removing item with ID:", itemId);
    if (itemId) {
      dispatch(removeFromBucket(itemId));
    } else {
      console.error("Attempted to remove item with undefined ID");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bucket</h1>
      {bucket.length > 0 ? (
        <div className="flex flex-col gap-2">
          {bucket.map((item) => (
            <div key={item.id || `item-${Date.now()}-${Math.random()}`} className="border rounded-lg shadow-sm">
              <div className="flex pt-2 gap-2">
                <div className="w-[105px] flex items-center justify-center h-[130px] overflow-hidden">
                  <img
                    src={item?.imageUrls || "https://via.placeholder.com/150"}
                    alt={item?.name || "Unknown Item"}
                    className="w-full h-2/3 rounded-md"
                  />
                </div>
                <div className="w-[189px] flex flex-col gap-2 h-[150px]">
                  <div className="flex gap-2">
                    <h3 className="text-sm font-medium">{item?.name || "Unnamed Item"}</h3>
                  </div>
                  <p className="text-gray-600 text-xs font-normal">{item?.description || "No description available."}</p>
                  <div className="flex justify-between pr-3 pb-3">
                    <div className="flex justify-start items-center text-[14px] font-semibold text-[#212121]">
                      <FaRupeeSign />
                      {item.regularPrice}
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 text-xs px-2 py-1 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your bucket is empty.</p>
      )}
    </div>
  );
};

export default Bucket;