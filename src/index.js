import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import walletRoutes from "./routes/wallet.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(walletRoutes);

app.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});
