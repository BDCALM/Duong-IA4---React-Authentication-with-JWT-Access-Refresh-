//file server.js
import express from "express"; 
import cors from "cors";       
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import userRoutes from "./route/user.route.js";

dotenv.config(); // Load biến môi trường 

const app = express(); 
const PORT = process.env.PORT || 3000; 
// Danh sách các domain được phép truy cập
const allowedOrigins = [
  'http://localhost:5173', // Cho phép Localhost (để bạn test ở máy)
  'https://ia-03-user-registration-api-with-re-seven.vercel.app' // Cho phép Vercel (BỎ dấu / ở cuối)
];

app.use(cors({
  origin: function (origin, callback) {
    // Cho phép requests không có origin (như Postman, curl, hoặc same-origin)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      // Nếu origin không nằm trong danh sách cho phép
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Giữ nguyên dòng này nếu bạn dùng cookies/sessions
}));

app.use(express.json()); 

//route
app.use('/api/user', userRoutes);


const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`\n✅ Server đang chạy tại: http://localhost:${PORT}`);
  });
};

startServer();