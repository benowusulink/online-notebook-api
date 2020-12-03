/* global imports for the server */
const express = require("express");
const knex = require("knex");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

/* Imported components for express routing */
const Signin = require("./components/signin.js");
const Register = require("./components/register.js");
const ntn = require("./components/note-container.js");
const newNote = require("./components/new-note.js");

/* using and caching express */
const app = express();

/* middleware */
app.use(cors(), bodyParser.json());

/* dotenv import for environmental variables */
require('dotenv').config();

/* connecting to the postgres server 
through database */
const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});


/* server handling from client to database*/
app.get("/", (req, res) => {
  return res.json("server working");
});

/* Sign in route */
app.post("/signin", (req, res) => {
  Signin.SignIn(req, res, bcrypt, db);
});

/* Register route */
app.post("/register", (req, res) => {
  Register.RegisterHandler(req, res, db);
});

/* note-container route */
app.post("/note-container", (req, res) => {
  ntn.NoteContainer(req, res, db);
});

/* new-note route */
app.post("/new-note", (req, res) => {
  newNote.NewNote(req, res, db);
});

/* starting express server */
app.listen(process.env.PORT, () => {
  console.log(`api is running smooth on ${process.env.PORT}`);
});
