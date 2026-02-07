import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env.js";
import { userRouter } from "./routes/user.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`API server running on http://localhost:${env.PORT}`);
});

export default app;
