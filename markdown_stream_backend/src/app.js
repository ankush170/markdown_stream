import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import markdownRoutes from "./routes/markdownRoutes.js";
import fetch from "node-fetch";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", markdownRoutes);

app.get("/proxy", async (req, res) => {
  const { url } = req.query;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.set("Content-Type", response.headers.get("Content-Type"));
    res.set("Access-Control-Allow-Origin", "*");
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching PDF");
  }
});

export default app;
