import express from "express";
import cors from "cors";
//step 2
import bookrecords from "./routes/bookrecord.js";
//step 12
import users from "./routes/userRoutes.js";
//Step 2 - register the routes in express so they can be accessible
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

//step 2
app.use("/api", bookrecords);
app.use("/api", users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
