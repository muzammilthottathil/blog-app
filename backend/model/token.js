import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
});

const Token = mongoose.model("token", tokenSchema);

export default Token;
