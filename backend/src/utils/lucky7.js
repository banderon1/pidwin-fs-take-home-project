import Lucky7 from "../models/lucky7.js";

function randomDiceValue() {
  return Math.floor(Math.random() * 6 + 1);
}

const lucky7 = async (req, res, next) => {
  setInterval(async function() {
    const result = await Lucky7.create({
      value1: randomDiceValue(),
      value2: randomDiceValue(),
    });
  }, 15000); //15 seconds
};

export default lucky7;
