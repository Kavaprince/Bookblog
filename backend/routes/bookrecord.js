import express from "express";
import multer from "multer";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";
dotenv.config({ path: "./config.env" });

//const storage = multer.memoryStorage(); // Store files in memory for processing

const bucketName = "my-first-mern-bucket";
const keyFilename =
  "C://Users/david/OneDrive/Desktop/MERN Projects/keyfilename/my-mern-project-455501-9a67b2a06f86.json";
const storage = new Storage({
  keyFilename,
});
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for file uploads
const routes = express.Router();

// Multer configuration
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });*/

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
      const file = req.file;
      if (!file) {
        return res.status(400).send({ message: "Image file is required." });
      }

      const folderPath = "book-blog-post/book-image"; // Logical folder path
      const filePath = `${folderPath}/${file.originalname}`; // Full object name

      const bucket = storage.bucket(bucketName); // Access the bucket
      const blob = bucket.file(filePath); // Create file in bucket
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        console.error("Upload error:", err);
        return res.status(500).send({ message: "Error uploading file." });
      });

      blobStream.on("finish", () => {
        console.log("File uploaded successfully to Google Cloud Storage");

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;

        const newDocument = {
          title: req.body.title,
          description: req.body.description,
          author: req.user._id,
          content: req.body.content,
          datecreated: req.body.datecreated,
          image: file.originalname,
          path: publicUrl,
        };

        db.collection("book_list")
          .insertOne(newDocument)
          .then((result) => res.json(result))
          .catch((err) => {
            console.error("Error inserting document:", err);
            res.status(500).send("Error adding book");
          });
      });

      blobStream.end(file.buffer); // Write file buffer to Google Cloud Storage
    } catch (err) {
      console.error("Unexpected error:", err);
      res.status(500).send("An unexpected error occurred.");
    }
  }
);

//#4- Update one
routes.put(
  "/books/update/:id",
  verifyToken,
  upload.single("audio"),
  async (req, res) => {
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

      const file = req.file;
      if (file) {
        // Upload new audio file to Google Cloud Storage
        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobStream.on("error", (err) => {
          console.error("Upload error:", err);
          return res
            .status(500)
            .send({ message: "Error uploading audio file." });
        });

        blobStream.on("finish", async () => {
          console.log("Audio uploaded successfully to Google Cloud Storage");

          const audioPath = `https://storage.googleapis.com/${bucketName}/${file.originalname}`;
          updates.$set.audio = audioPath; // Add audio path to the update document

          // Perform the database update after audio upload is complete
          const collection = await db.collection("book_list");
          const result = await collection.updateOne(query, updates);

          if (result.modifiedCount === 0) {
            return res
              .status(404)
              .send({ message: "No book found to update or no changes made." });
          }

          res.json({
            message: "Book and audio updated successfully",
            updatedId: req.params.id,
            changes: updates.$set,
          });
        });

        blobStream.end(file.buffer); // Write file buffer to Google Cloud Storage
      } else {
        // Perform update if no new audio file is provided
        const collection = await db.collection("book_list");
        const result = await collection.updateOne(query, updates);

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .send({ message: "No book found to update or no changes made." });
        }

        res.json({
          message: "Book updated successfully",
          updatedId: req.params.id,
          changes: updates.$set,
        });
      }
    } catch (err) {
      console.error("Update Error:", err.message, err.stack);
      res.status(500).send("Error updating book and/or audio");
    }
  }
);

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
