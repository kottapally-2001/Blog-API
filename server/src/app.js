import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const allowed = [
  process.env.CLIENT_PUBLIC_ORIGIN || "http://localhost:5173",
  process.env.CLIENT_ADMIN_ORIGIN || "http://localhost:5174",
];
app.use(cors({ origin: allowed, credentials: false }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use((_, res) => {
  res.status(200).json({ status: "ok" });
});




export default app;
