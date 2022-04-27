const express = require('express');
//define an express method
const router = express.Router();

const authenticateUser = require("../middleware/auth/authentication");
const get_data = require("../requests/get_backend");

//----------ROUTES----------//

router.get('/', authenticateUser, async (req, res) => {
    try{

        //const data = await get_data('/students');

        //res.render("students", {students: data});
        res.render("students");
    }catch(err){
        res.sendStatus(400).json({ message:err });
    }
});


router.post('/', authenticateUser, async (req, res) => {
    try{
        res.render("students");
    }catch(err){
        res.sendStatus(400).json({ message:err });
    }
});


//export the router we have define above
module.exports = router;