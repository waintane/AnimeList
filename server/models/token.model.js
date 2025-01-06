import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: [true]
    }
});

const Token = mongoose.model("Token", TokenSchema);

export default Token;