import express from "express";
import multer from "multer";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const routes = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Verify Token Middleware
function verifyToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

//#1- Retrieve all
routes.get("/books/all", verifyToken, async (req, res) => {
  let collection = await db.collection("book_list");
  let result = await collection.find({}).toArray();
  if (result.length > 0) {
    res.json(result);
  } else {
    throw new Error("Data was not found!");
  }
});

//#2- Retrieve one
routes.get("/books/:id", verifyToken, async (req, res) => {
  let collection = await db.collection("book_list");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);
  if (Object.keys(result).length > 0) {
    res.json(result);
  } else {
    throw new Error("Data was not found!");
  }
});

// Create Book
routes.post(
  "/books/create",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);

      let newDocument = {
        title: req.body.title,
        description: req.body.description,
        author: req.user._id,
        content: req.body.content,
        datecreated: req.body.datecreated,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      };

      console.log("New document to insert:", newDocument);

      let collection = await db.collection("book_list");
      let result = await collection.insertOne(newDocument);
      console.log("Insert result:", result);
      res.json(result);
    } catch (err) {
      console.error("Error adding book:", err);
      res.status(500).send("Error adding book");
    }
  }
);

//#4- Update one
routes.put("/books/update/:id", verifyToken, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        content: req.body.content,
        datecreated: req.body.datecreated,
      },
    };

    let collection = await db.collection("book_list");
    let result = await collection.updateOne(query, updates);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating book");
  }
});

//#5- Delete one
routes.delete("/books/delete/:id", verifyToken, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("book_list");
    let result = await collection.deleteOne(query);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default routes;
