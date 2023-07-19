const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/node_crud_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Server started on port 3001");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.render("index", { users });
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error saving user:", error);
  }
});

app.post("/users/:id/delete", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
});
