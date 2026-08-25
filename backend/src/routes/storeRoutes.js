const express = require("express");
const { getNearbyStores } = require("../controllers/storeController");

const router = express.Router();

router.get("/", getNearbyStores);

module.exports = router;
