import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://ankit9928meena:mubjih-4qaxnI-xirdud@ankit.hgyhudj.mongodb.net/ankit"
);

app.listen(3000, () => {
  console.log("listing on port 3000");
});
