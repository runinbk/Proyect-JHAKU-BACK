import express from "express";
import cors from "cors";

import { PORT } from "./config.js";
import Routes from "./routes/Casos.routes.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(Routes);
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
