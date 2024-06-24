import mongoose, { Document, Schema, InferSchemaType } from "mongoose";

interface IUser   {
  name: string;
  email: string;
  phone_number: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export { UserModel, IUser };
