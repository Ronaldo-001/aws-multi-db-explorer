import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dynamoRoutes from "./routes/dynamodb.js";
import rdsRoutes from "./routes/rds.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dynamodb", dynamoRoutes);
app.use("/api/rds", rdsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
