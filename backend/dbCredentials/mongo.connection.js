import mongoose from "mongoose";

function connectToDB(){
mongoose
  .connect("mongodb://localhost:27017/chatapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection failed", err));
}
  export default connectToDB;