import mongoose from "mongoose";

const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error.message);

    process.exit(1); // STOP server if DB fails
  }
};

export default connectToMongodb;