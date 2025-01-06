import express from "express";
import {createNewUser, logInUser, getUsername, getToken} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/newUser", createNewUser);

router.post("/logInUser", logInUser);

router.post("/token", getToken);

router.get("/getUsername",authenticateToken, getUsername);


export default router;