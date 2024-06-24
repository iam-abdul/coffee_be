import { Request, Response } from "express";
import { UserModel, IUser } from "../../models/User.js";
import { userSignupSchema } from "./userSchema.js";

// swagger docs
/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: user created
 *       400:
 *         description: bad request
 *       500:
 *         description: internal server error
 */
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, phone_number } = req.body as {name: string, email: string, phone_number: string};
    const { error } = userSignupSchema.validate({ name, email, phone_number });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const user:IUser = { email,  phone_number, name };

    await UserModel.create(user);

    return res.status(201).json({ message: "user created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
