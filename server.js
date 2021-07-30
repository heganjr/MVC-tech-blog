const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});


// server.js
// handlebars - homepage
// login
// profile - see all my own posts, edit and delete my own stuff
//  handlebars - built-in helper #loggedIn (RecSession) - Express-session (cookies)
// connection to database - SQL - Sequelize
// db folder to set up database - schema.sql DONE
// utils folder - auth.js and helpers.js - Done

// Home should see all the posts - if logged in - Can comment on posts
// Profile(Dashboard) - Can see all my own posts and can edit/ delete those posts
// Logout - deletes the session
// SQL - sequelize (MODELS)
// - index.js
// =

// queries in controller
// posts and comments models. DONE

// ROUTES
// HOME - WHAT THE USER SEES
// PROFILE - WHAT THE USER SEES

// Server for Handle bars and helpers

// LOOK AT THE FRONT END SINGLE POST FOR HANDLEBARS!
