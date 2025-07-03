import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { notificationRouter } from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/notification", notificationRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Notification service running on http://localhost:${PORT}`);
});

export default app;
