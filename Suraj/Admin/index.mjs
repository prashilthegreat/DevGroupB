import express from "express";
const app = express()
import "dotenv/config";
import cors from "cors";
import { fileURLToPath } from "url";
import { readdirSync } from 'fs';
import path from "path";

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = path.resolve(__dirname, "./routes");
const routeFiles = readdirSync(routesPath);
routeFiles.map(async (file) => {
  const routeModule = await import(`./routes/${file}`);
  app.use("/", routeModule.default);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.listen(port, () => {
  console.log(`choclate app listening on port ${port}`)
})