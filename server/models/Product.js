import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0 },
  description: { type: String }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
