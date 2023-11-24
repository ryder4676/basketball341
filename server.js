// This code sets up our app, picks a port for the server, connects different routes, 
// and gets the database ready to use.

// Import necessary modules
const express = require("express");
const {connectToDatabase} = require("./database/database")
const BodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const gitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

// Create an instance of the express application
const app = express();

// Define  the port number, using process.env.PORT if available or 8080 as a default
const port = process.env.PORT || 8080;

// Use 'body-parser' middleware to parse URL-encoded request bodies with extended options.
// Additionally, use the 'body-parser' module to handle JSON request bodies.
app.use(BodyParser.urlencoded({ extended: true }), BodyParser.json())
.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  // res.setHeader("Access-Control-Allow-Credentials", "true");

  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE");
  next();
})
// .use(cors({methods:["GET", "POST", "PUT", "DELETE", "UPDATE", "PATCH"]}))
// .use(cors({origin: "*"}))
// USe the routes defined in "./routes for the root path
.use("/", require("./routes"));

passport.use(new gitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  // user.findOrCreate({githubId: profile.Id}, function (err,user){
  return done(null, profile)
  // })
}
));

passport.serializeUser((user, done)=>{
  done(null,user)
});
passport.deserializeUser((user, done)=>{
  done(null,user)
});

app.get("/", (req, res)=>{ res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Successfully logged out")});
app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "api-docs", session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  });

// Connect to the MongoDB database using Mongoose
connectToDatabase();


app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});