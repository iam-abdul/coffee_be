import mongoose, { Schema } from "mongoose";

enum EItemTypes {
  COFFEE = "COFFEE",
  FOOD = "FOOD",
  DRINKS = "DRINKS",
}

interface IItem {
  id?: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  image: string;
  price: number;
  type: EItemTypes;
}

const itemSchema = new Schema<IItem>({
  shopId: { type: Schema.Types.ObjectId, ref: "Shops" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: EItemTypes, required: true },
});

const Item = mongoose.model<IItem>("Item", itemSchema);

export { Item, IItem, EItemTypes };
