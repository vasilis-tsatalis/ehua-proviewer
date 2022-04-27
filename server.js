'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const flash = require("express-flash");
const cors = require('cors');
const cookieSession = require("cookie-session");

require('dotenv/config');

const authenticateUser = require("./middleware/auth/authentication");

const BASE_URL = process.env.BASE_URL

const app = express();

//----------MIDDLEWARES----------//
//we are using them to execute some packages like below or ex auth

app.use(cors());
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(express.urlencoded({ extened: true }));
app.set("view engine", "ejs");
app.use(flash());
app.use(cookieSession({keys: [process.env.COOKIE_KEY]}));


//----------ROUTES----------//
// Routes for serving frontend files

// LOGIN STARTED ROUTE

app.get('/', async(req,res) => { res.render('signin') });

const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

const dashboardRoute = require('./routes/dashboard');
app.use('/dashboard', dashboardRoute);

const studentsRoute = require('./routes/students');
app.use('/students', studentsRoute);

const professorsRoute = require('./routes/professors');
app.use('/professors', professorsRoute);

const sectionsRoute = require('./routes/sections');
app.use('/sections', sectionsRoute);

// // // // // // // // // // 
const departmentsRoute = require('./routes/departments');
app.use('/departments', departmentsRoute);

const coursesRoute = require('./routes/courses');
app.use('/courses', coursesRoute);

const accountRoute = require('./routes/account');
app.use('/account', accountRoute);

//--------------------------//

//logout
app.get('/logout', authenticateUser, (req, res) => {
    req.session.user = null;
    res.redirect('/');
  });


//----------HTTP SERVER----------//
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));