import { Request, Response } from "express";
import mongoose from "mongoose";
import { IShop, Shop } from "../../models/Shop.js";
import { EItemTypes, IItem, Item } from "./../../models/Items.js";
import { addShopSchema, addItemSchema, addReviewSchema } from "./shopSchema.js";
import { IReview, Review } from "../../models/Reviews.js";

/**
 * @swagger
 * /api/v1/shops/addShop:
 *   post:
 *     summary: Adds a new shop to the database
 *     tags:
 *       - Shops
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Store"
 *               description:
 *                 type: string
 *                 example: "A store selling tech gadgets."
 *               image:
 *                 type: string
 *                 format: binary
 *                 example: "http://example.com/path/to/image.jpg"
 *               lat:
 *                 type: number
 *                 example: 40.7128
 *               long:
 *                 type: number
 *                 example: -74.0060
 *               city:
 *                 type: string
 *                 example: "New York"
 *               state:
 *                 type: string
 *                 example: "NY"
 *     responses:
 *       201:
 *         description: Shop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "shop created"
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
export const addShop = async (req: Request, res: Response) => {
  try {
    const { name, description, image, lat, long, city, state } = req.body as {
      name: string;
      description: string;
      image: string;
      lat: number;
      long: number;
      city: string;
      state: string;
    };
    const { error } = addShopSchema.validate({
      name,
      description,
      image,
      lat,
      long,
      city,
      state,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const shopObj: IShop = {
      name,
      description,
      image,
      lat,
      long,
      city,
      state,
    };

    // creating a shop
    const shop = await Shop.create(shopObj);

    return res.status(201).json({ message: "shop created", shop });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
/**
 * @swagger
 * /api/v1/shops/addItem:
 *   post:
 *     summary: Adds an item to a shop
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopId:
 *                 type: string
 *                 example: "60d5f6b7a3eefb00048c9a2a"
 *               name:
 *                 type: string
 *                 example: "Gadget X"
 *               description:
 *                 type: string
 *                 example: "An advanced gadget."
 *               image:
 *                 type: string
 *                 format: binary
 *                 example: "http://example.com/path/to/item.jpg"
 *               price:
 *                 type: number
 *                 example: 99.99
 *               type:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Item added to shop successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "item added to shop"
 *                 item:
 *                   type: object
 *                   properties:
 *                     shopId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     image:
 *                       type: string
 *                       format: binary
 *                     price:
 *                       type: number
 *                     type:
 *                       type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid shop ID or missing fields"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
export const addItemToShop = async (req: Request, res: Response) => {
  try {
    const { shopId, name, description, image, price, type } = req.body as {
      shopId: string;
      name: string;
      description: string;
      image: string;
      price: number;
      type: string;
    };

    const { error } = addItemSchema.validate({
      shopId,
      name,
      description,
      image,
      price,
      type,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // validate if the shop exists and user is the owner of shop
    const shopExists = await Shop.findOne({
      _id: new mongoose.Types.ObjectId(shopId),
    });

    if (!shopExists) {
      return res.status(400).json({
        message: "invalid shop",
      });
    }

    // else create an item
    const newItem: IItem = {
      shopId: new mongoose.Types.ObjectId(shopId),
      name: name,
      description: description,
      image: image,
      price: price,
      type: type as EItemTypes,
    };

    const item = await Item.create(newItem);

    return res.status(201).json({
      message: "item added to shop",
      item,
    });
  } catch (err) {
    console.log("Err adding item to shop ", err);
    return res.status(500).json({ message: "internal server error" });
  }
};
/**
 * @swagger
 * /api/v1/shops/addReview:
 *   post:
 *     summary: Adds a review to a shop
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopId:
 *                 type: string
 *                 example: "60d5f6b7a3eefb00048c9a2a"
 *               rating:
 *                 type: number
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "review added"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid shop ID or missing fields"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
export const addReview = async (req: Request, res: Response) => {
  try {
    const { shopId, rating } = req.body as {
      shopId: string;
      rating: number;
    };

    const { error } = addReviewSchema.validate({
      shopId,
      rating,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // check if the shop exists
    const shopExists = await Shop.findOne({
      _id: new mongoose.Types.ObjectId(shopId),
    });

    if (!shopExists) {
      return res.status(400).json({
        message: "invalid shop",
      });
    }

    const newReview: IReview = {
      shopId: new mongoose.Types.ObjectId(shopId),
      rating: rating,
    };

    await Review.create(newReview);

    return res.status(201).json({ message: "review added" });
  } catch (err) {
    console.log("Err adding review for shop ", err);
    return res.status(500).json({ message: "internal server error" });
  }
};
/**
 * @swagger
 * /api/v1/shops/list:
 *   get:
 *     summary: Retrieve a paginated list of shops with their average ratings and total review counts.
 *     description: Returns a list of shops along with their average review rating and the total number of reviews they have received.
 *     tags:
 *       - Shops
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *         required: false
 *         default: 1
 *     responses:
 *       200:
 *         description: A list of shops with their average ratings and total review counts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 shops:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 *                       lat:
 *                         type: number
 *                       long:
 *                         type: number
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       avgRating:
 *                         type: number
 *                       totalCount:
 *                         type: integer
 *       500:
 *         description: Internal Server Error
 */
export const listShops = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string);

    const pipeline = [
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "shopId",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          image: { $first: "$image" },
          lat: { $first: "$lat" },
          long: { $first: "$long" },
          city: { $first: "$city" },
          state: { $first: "$state" },
          rating: { $avg: { $ifNull: ["$reviews.rating", 5] } },
          total_ratings: {
            $sum: { $cond: [{ $ne: ["$reviews.rating", null] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          lat: 1,
          long: 1,
          city: 1,
          state: 1,
          rating: 1,
          total_ratings: 1,
        },
      },
    ];

    const shops = await Shop.aggregate(pipeline);

    return res.status(200).json({
      message: "success",
      shops,
    });
  } catch (err) {
    console.log("Err in listing all the shops ", err);
    return res.status(500).json({ message: "internal server error" });
  }
};
/**
 * @swagger
 * /api/v1/shops/items:
 *   get:
 *     summary: Retrieve items based on shop and type
 *     description: Returns a list of items associated with a specific shop and item type.
 *     parameters:
 *       - name: type
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of item to filter by.
 *       - name: shop
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shop to retrieve items from.
 *     responses:
 *       200:
 *         description: A list of items successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: internal server error
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         # Define the properties of an Item here
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         # Add other relevant fields for an Item
 */
export const getItems = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string;
    const shop = req.query.shop as string;
    const items = await Item.find({
      shopId: new mongoose.Types.ObjectId(shop),
      type: type,
    });

    return res.status(200).json({
      message: "success",
      items,
    });
  } catch (err) {
    console.log("Err in getting shop", err);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getShop = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string);
    const shopId = req.query.id as string;

    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(shopId),
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "shopId",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          image: { $first: "$image" },
          lat: { $first: "$lat" },
          long: { $first: "$long" },
          city: { $first: "$city" },
          state: { $first: "$state" },
          rating: { $avg: { $ifNull: ["$reviews.rating", 5] } },
          total_ratings: {
            $sum: { $cond: [{ $ne: ["$reviews.rating", null] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          lat: 1,
          long: 1,
          city: 1,
          state: 1,
          rating: 1,
          total_ratings: 1,
        },
      },
    ];

    const shops = await Shop.aggregate(pipeline);

    return res.status(200).json({
      message: "success",
      shop: shops[0],
    });
  } catch (err) {
    console.log("Err in listing all the shops ", err);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log("Err searching ");
    return res.status(500).json({ message: "internal server error" });
  }
};
