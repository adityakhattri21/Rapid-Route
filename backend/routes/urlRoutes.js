const express = require("express");
const { generateUrl, getUrl } = require("../controller/urlController");
const router = express.Router();


router.route("/url/generate").post(generateUrl);
router.route("/urls/:urlCode").get(getUrl);


module.exports = router;