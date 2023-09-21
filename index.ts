import express from "express";
import connectDB from "./config/db";
import cors from "cors";
import UserRouter from "./routers/UserRouter.js";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

connectDB();

app.get("/", (req: any, res: any) => {
  res.json({ message: "Test" });
});

app.use("/api", UserRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
