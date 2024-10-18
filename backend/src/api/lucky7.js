import express from "express";
import lucky7Winners from "./lucky7-winners.js";

const router = express.Router();

router.get("/winners", lucky7Winners);

export default router;
