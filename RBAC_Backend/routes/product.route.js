import express from "express";
import { addProduct , getProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { authorisedRoles } from "../middlewares/role.middleware.js";

export const ProductRoute=express.Router();

ProductRoute.post("/addProduct", authenticate, authorisedRoles('USER','ADMIN','MANAGER'), addProduct);

ProductRoute.get("/getProducts", authenticate, authorisedRoles('USER','ADMIN','MANAGER'), getProducts);

ProductRoute.put("/update/:id", authenticate, authorisedRoles('USER','ADMIN','MANAGER'), updateProduct);

ProductRoute.delete("/delete/:id", authenticate, authorisedRoles('USER','ADMIN','MANAGER'), deleteProduct);

