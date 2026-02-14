import express from "express";
import { signup , login } from "../controllers/user.controller.js";

export const UserRoute=express.Router();

UserRoute.post("/signup",signup);

UserRoute.post("/login", login);