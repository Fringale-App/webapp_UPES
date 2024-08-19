import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBucket } from '../redux/food/foodSlice';

const Bucket = () => {
  const dispatch = useDispatch();
  
  // Access the current user and the user's bucket from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const bucket = useSelector((state) => state.food.bucket);

  const handleRemove = (item) => {
    if (item && item.name) { // Ensure item and item.name are defined
      dispatch(removeFromBucket(item));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bucket</h1>
      {currentUser ? (
        <div>
          {bucket && bucket.length > 0 ? (
            bucket.map((item, index) => (
              item ? ( // *** Ensure item is not null or undefined ***
              <div
                key={index}
                className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <img
                    src={item?.image || "https://via.placeholder.com/150"} // Fallback image if item.image is null or undefined
                    alt={item?.name || "Unknown Item"} // Fallback alt text if item.name is null or undefined
                    className="w-16 h-16 rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item?.name || "Unnamed Item"}</h3>
                    <p className="text-gray-600">{item?.description || "No description available."}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
              ) : null // *** Safely skip if item is null ***
            ))
          ) : (
            <p>Your bucket is empty.</p>
          )}
        </div>
      ) : (
        <p>Please sign in to view your bucket.</p>
      )}
    </div>
  );
};

export default Bucket;
