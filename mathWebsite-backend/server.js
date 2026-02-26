import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import tuitionRoutes from "./routes/tuitionRoutes.js";
import path from "path";



dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true })); 
// change during deployment to - >origin: "http://localhost:5173"

app.use(express.json());

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname,"/mathWebsite/dist")));
app.get(/.*/,(req,res)=>{
  res.sendFile(path.join(__dirname,"mathWebsite","dist","index.html"))
})

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tuition", tuitionRoutes);



app.get("/", (req, res) => res.send("Backend is running ✅"));

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

start();
