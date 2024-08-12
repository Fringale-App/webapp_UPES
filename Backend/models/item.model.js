import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  imageUrls: { type: [String], required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  isVeg: { type: Boolean, required: true },
  category:{ type: String, required: true },
  regularPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  offer: { type: Boolean, required: true },
  resRef: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item