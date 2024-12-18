import mongoose from "mongoose";

const MovieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    Timestamps: true,
  }
);

const Movies = mongoose.model("Movies", MovieSchema);

export default Movies;