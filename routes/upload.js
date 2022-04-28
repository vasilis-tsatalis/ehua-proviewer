const express = require('express');
//define an express method
const router = express.Router();

const authenticateUser = require("../middleware/auth/authentication");

//----------ROUTES----------//

router.post("/upload", authenticateUser, async (req, res) => {

});



//export the router we have define above
module.exports = router;