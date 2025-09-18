import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/pincode/:pincode", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${req.params.pincode}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pincode" });
  }
});

export default router;
