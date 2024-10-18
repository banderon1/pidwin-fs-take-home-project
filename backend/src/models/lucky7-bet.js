import mongoose from "mongoose";

const lucky7BetSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  previousLucky7Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lucky7Game',
    index: true
  },
  isLucky: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});
//a user can only place 1 bet on each game
lucky7BetSchema.index({ userId: 1, previousLucky7Id: 1 }, { unique: true });

export default mongoose.model("Lucky7Bet", lucky7BetSchema);