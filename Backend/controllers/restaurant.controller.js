import Item from "../models/item.model.js"
import Restaurant from "../models/restaurant.model.js"

export const registerRes = async (req,res,next)=>{
    try{
    const resta = await Restaurant.create(req.body)
    res.status(201).json(resta)
    }catch(err){
        next(err)
    }
}
export const getRestaurant = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
        return next();
      }
      res.status(200).json(restaurant);
    } catch (error) {
      next(error);
    }
  };

  export const updateRestaurant = async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return next();
    }
    // if (req.user.id !== restaurant.userRef) {
    //   return next();
    // }
  
    try {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedRestaurant);
    } catch (error) {
      next(error);
    }
 };  

 export const insertManyRestaurants = async (req, res ,next) => {
  try {
    const restaurantData = req.body; // Expecting an array of restaurant objects in the request body

    // Insert many restaurants into the database
    const insertedRestaurants = await Restaurant.insertMany(restaurantData);

    res.status(201).json({
      success: true,
      message: 'Restaurants inserted successfully'
    });
  } catch (error) {
  next(error)
  
  }
};

export const getResFoods = async (req, res, next) => {
  try {
    const foods = await Item.find({ resRef: req.params.id });
    if(!foods) return next()
    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
}

 export const getRestaurants = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const Restaurants = await Restaurant.find({
        name: { $regex: searchTerm, $options: 'i' }
        
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(Restaurants);
    } catch (error) {
      next(error);
    }
  };