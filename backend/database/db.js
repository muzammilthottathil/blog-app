import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });

        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed", error);
    }
};

export default connection;
