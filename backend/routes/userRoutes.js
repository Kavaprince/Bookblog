//step 12
import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
//step 13
import bcrypt from "bcrypt";
//step 15
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const SALT_ROUNDS = 6;
// router is an instance of the express router.
// We use it to define our userRoutes.
// The router will be added as a middleware and will take control of requests starting with path /record.
//Step 1 - create the userRoutes

const userRoutes = express.Router();

//#1- Retrieve all
userRoutes.get("/users/all", async (req, res) => {
  let collection = await db.collection("book_list");
  let result = await collection.find({}).toArray();
  if (result.length > 0) {
    res.json(result);
  } else {
    throw new Error("Data was not found!");
  }
});

//#2- Retrieve one
userRoutes.get("/users/:id", async (req, res) => {
  let collection = await db.collection("book_list");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (Object.keys(result).length > 0) {
    res.json(result);
  } else {
    throw new Error("Data was not found!");
  }
});

//#3- Create one
userRoutes.post("/users/create", async (req, res) => {
  try {
    //matches email if it already exists
    const takenEmail = await db
      .collection("users")
      .findOne({ email: req.body.email });
    console.log(takenEmail);

    if (takenEmail) {
      return res.status(400).json({ message: "The email is taken" });
    } else {
      //password security
      const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS); //hash encrypts the password in to code, and SALT_ROUNDS is the times that the hash algorithm repeats to provide an encrypted code
      let newDocument = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        joinDate: new Date(),
        bookPosts: [],
      };
      let collection = await db.collection("users");
      let result = await collection.insertOne(newDocument);
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

//#4- Update one
userRoutes.put("/users/update/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        joinDate: req.body.joinDate,
        bookPosts: req.body.bookPosts,
      },
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

//#5- Delete one
userRoutes.delete("/users/delete/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

//step 14
//#6- Login
userRoutes.post("/users/login", async (req, res) => {
  //matches email if it already exists
  const user = await db.collection("users").findOne({ email: req.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(req.body.password, user.password);
    if (confirmation) {
      //step15
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: "1h" });
      res.json({ success: true, token }); //step 15 - change user to token
    } else {
      res.json({ success: false, message: "Incorrect password" });
    }
  } else {
    res.json({ success: false, message: "User not found" });
  }
});

export default userRoutes;
