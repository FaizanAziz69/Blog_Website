
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect('mongodb+srv://Faizan:project1@cluster0.a4qx1bg.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 console.log(`DataBase Connected at ${connect.connection.host}`);
  } catch (error) {
    console.log("DataBase connection error",error);
    process.exit(1);
  }
};
export default connectDB