import express from "express";
import cors from "cors";
import movies from "./routes/movies.route.js";
import users from "./routes/user.route.js";
import mongoose, { mongo } from "mongoose";
import 'dotenv/config';

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/movies", movies);
app.use("/api/user",users);

mongoose.connect("mongodb+srv://admin1:admin1@cluster0.k8vn1vm.mongodb.net/Movie-Api?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  app.listen(PORT, () => {
  });
});
