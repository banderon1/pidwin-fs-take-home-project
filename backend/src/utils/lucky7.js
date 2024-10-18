import Lucky7Bet from "../models/lucky7-bet.js";
import Lucky7 from "../models/lucky7.js";
import User from "../models/user.js";

function randomDiceValue() {
  return Math.floor(Math.random() * 6 + 1);
}

const lucky7 = async (io) => {
  setInterval(async function() {
    const previousGame = await Lucky7.findOne({}, {}, { sort: { 'createdAt' : -1 } });

    const result = await Lucky7.create({
      value1: randomDiceValue(),
      value2: randomDiceValue(),
    });

    //check bets
    //TODO: move this to a separate service/lambda function
    const isLucky = result.value1 + result.value2 === 7;
    const bets = await Lucky7Bet.find({ previousLucky7Id: previousGame._id })
    bets.forEach(async bet => {
      const { userId } = bet;
      const user = await User.findOne({ _id: userId });

      if (isLucky === bet.isLucky) {
        io.emit(`lucky7Message${userId}`, "win");
        user.lucky7Streak += 1;
      } else {
        io.emit(`lucky7Message${userId}`, "lose");
        user.lucky7Streak = 0;
      }
      await user.save();
    });
  }, 15000); //15 seconds
};

export default lucky7;
