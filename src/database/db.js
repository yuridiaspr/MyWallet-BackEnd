import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  console.log("MongoDB conectado com sucesso!");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("MyWallet");
export const usersCollection = db.collection("users");
export const walletCollection = db.collection("wallet");
export const sessionsCollection = db.collection("sessions");
