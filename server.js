import express from "express";
import { router as userRouter } from "./routes/api/users";
import { router as profileRouter } from "./routes/api/profile";
import { router as postRouter } from "./routes/api/posts";
import { router as authRouter } from "./routes/api/auth";
import { connectDB } from "./config/db";
import path from 'path';

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

// Serve static assets in production
if(process.env.NODE_ENV==='production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
