//file server.js
import express from "express"; 
import cors from "cors";       
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json()); 

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`\n✅ Server đang chạy tại: http://localhost:${PORT}`);
  });
};

startServer();