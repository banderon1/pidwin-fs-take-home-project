import mongoose from "mongoose";

const lucky7BetSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, //reference User model
  previousLucky7Id: mongoose.Schema.Types.ObjectId, //reference Lucky7Game model
  isLucky: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lucky7Bet", lucky7BetSchema);