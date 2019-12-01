import express from "express";
import { router as userRouter } from "./api/users";
import { router as profileRouter } from "./api/profile";
import { router as postRouter } from "./api/posts";
import { router as authRouter } from "./api/auth";
import { connectDB } from "./config/db";

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running!"));

// Define Routes
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
