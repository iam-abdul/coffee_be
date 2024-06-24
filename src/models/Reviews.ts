import mongoose, { Schema } from "mongoose";

interface IReview {
  id?: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  rating: number;
}

const reviewSchema = new Schema<IReview>({
  shopId: { type: Schema.Types.ObjectId, ref: "Shops" },
  rating: { type: Number, required: true },
});

const Review = mongoose.model<IReview>("Review", reviewSchema);

export { Review, IReview };
