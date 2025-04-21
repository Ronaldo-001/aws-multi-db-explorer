import express from "express";
import AWS from "aws-sdk";

const router = express.Router();

// AWS SDK configuration
AWS.config.update({
  region: process.env.AWS_REGION, // e.g., "us-west-2"
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // optional if you have it in the environment
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // optional if you have it in the environment
});

// Initialize DynamoDB Document Client
const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = "Users"; // DynamoDB Table Name

// Route to get users from DynamoDB
router.get("/users", async (req, res) => {
  try {
    const result = await dynamo.scan({ TableName: tableName }).promise();
    res.json(result.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Route to add a user to DynamoDB
router.post("/users", async (req, res) => {
  const { name } = req.body;
  const id = Date.now().toString(); // Simple unique ID

  const params = {
    TableName: tableName,
    Item: { id, name },
  };

  try {
    await dynamo.put(params).promise();
    res.status(201).json({ id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

export default router;
