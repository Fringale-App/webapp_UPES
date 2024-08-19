import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBucket } from '../redux/food/foodSlice';

const Bucket = () => {
  const dispatch = useDispatch();
  
  // Access the current user and the user's bucket from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const bucket = useSelector((state) => state.food.bucket);

  const handleRemove = (item) => {
    dispatch(removeFromBucket(item));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bucket</h1>
      {currentUser ? (
        <div>
          {bucket.length > 0 ? (
            bucket.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
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
