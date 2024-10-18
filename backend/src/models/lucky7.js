import mongoose from "mongoose";

const lucky7Schema = mongoose.Schema({
  value1: { type: Number, required: true },
  value2: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lucky7Game", lucky7Schema);