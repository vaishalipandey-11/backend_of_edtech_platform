const express = require("express")
const router = express.Router()
const { contactUsController } = require("../controllers/ContactUs")

// router.post("/contact", contactUsController)
router.post("/", contactUsController);

module.exports = router

