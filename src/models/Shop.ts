import mongoose, { Schema } from "mongoose";

interface IShop {
  id?: mongoose.Types.ObjectId;
  name: string;
  description: string;
  image: string;
  lat: number;
  long: number;
  city: string;
  state: string;
}

const shopSchema = new Schema<IShop>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export { Shop, IShop };
