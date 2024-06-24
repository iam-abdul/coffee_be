import express from "express";
import {
  addShop,
  addItemToShop,
  addReview,
  listShops,
  getItems,
  getShop,
} from "../controllers/shop/shopController.js";
const shopRouter = express.Router();
shopRouter.post("/addShop", addShop);
shopRouter.post("/addItem", addItemToShop);
shopRouter.post("/addReview", addReview);
shopRouter.get("/list", listShops);
shopRouter.get("/shop", getShop);
shopRouter.get("/items", getItems);

export default shopRouter;
