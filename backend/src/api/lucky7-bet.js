import Lucky7 from "../models/lucky7.js";
import Lucky7Bet from "../models/lucky7-bet.js";

const lucky7Bet = async (req, res) => {
  const { userId } = req;
  const { isLucky } = req.body;

  try {
    const previousGame = await Lucky7.findOne({}, {}, { sort: { 'createdAt' : -1 } });

    if (!previousGame) {
      return res.status(404).json({ message: "Game Does Not Exist" });
    }

    const secondsSinceLastGame = (Date.now() - Date.parse(previousGame.createdAt))/1000;
    if (secondsSinceLastGame > 10) {
      return res.status(404).json({ message: "Game Is Not Ready For Bet" });
    }

    const bet = await Lucky7Bet.create({
      userId,
      previousLucky7Id: previousGame._id,
      isLucky,
    });

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default lucky7Bet;