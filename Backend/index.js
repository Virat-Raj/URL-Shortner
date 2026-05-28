import express from "express";
import routers from "./routes/user.ruters.js";
import dotenv from "dotenv";
import connectMongoDB from "../Backend/DB-Connection/connectDB.js"
dotenv.config();
// const PORT =3000;
const app = express();
connectMongoDB(process.env.MONGODB_URI).then(() => console.log("MongoDB connected Successfully.."))
app.use(express.json());

app.use('/api',routers);



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`app is listening on http://localhost:${PORT}/api`))
