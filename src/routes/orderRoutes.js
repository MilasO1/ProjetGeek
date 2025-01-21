const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  removeOrder,
} = require("../controllers/orderController");


router.post("/:cartId", placeOrder);
router.get("/:userId", getUserOrders);
router.delete("/:cartId", removeOrder);

module.exports = router;
