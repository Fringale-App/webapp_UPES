import Item from "../models/item.model.js";

// Get all food items
export const getAllItems = async (req, res,next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
    
        if (offer === undefined || offer === 'false') {
          offer = { $in: [false, true] };
        }
    

    
        const searchTerm = req.query.searchTerm || '';
    
        const sort = req.query.sort || 'createdAt';
    
        const order = req.query.order || 'desc';
    
        const items = await Item.find({
          name: { $regex: searchTerm, $options: 'i' },offer,
          
        })
          .sort({ [sort]: order })
          .limit(limit)
          .skip(startIndex);
    
        return res.status(200).json(items);
      } catch (error) {
        next(error);
      }
};

// Get a single food item by ID
export const getItem = async (req, res, next) => {

  try {
    const item = await Item.findById(req.params.id);
    console.log("food"+item)
    if (!item) return next()
    res.status(200).json(item);

  } catch (error) {
    next(error)
  }
};

// Create a new food item
export const addItem = async (req, res ,next) => {
  try {
    const newItem = new Item({
      imageUrls: req.body.imageUrls,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      isVeg: req.body.isVeg,
      regularPrice: req.body.regularPrice,
      discountPrice: req.body.discountPrice,
      offer: req.body.offer,
      resRef: req.body.resRef
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(error)
  }
};

// Update a food item by ID
export const updateItem = async (req, res ,next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body ,
      { new: true }
    );

    if (!updatedItem) return next()
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error)
  }
};

// Delete a food item by ID
export const deleteItem = async (req, res ,next) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return next()
    res.status(200).json({ message: 'item deleted successfully' });
  } catch (error) {
    next(error)
  }
};