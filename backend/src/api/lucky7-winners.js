import User from "../models/user.js";

const lucky7Winners = async (req, res) => {
  try {
    const userList = await User.find().select('name lucky7Streak').sort({lucky7Streak: -1}).limit(10);

    res.status(200).json({ userList });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default lucky7Winners;