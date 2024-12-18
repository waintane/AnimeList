import express from "express";
//import Users from "../models/user.model";
import {createNewUser, findUser} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/newUser", createNewUser);

router.get("/findUser", findUser);

export default router;