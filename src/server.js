import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import homeRoutes from "./routes/home.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import editorRoutes from "./routes/editor.routes.js";
import builderRoutes from "./routes/builder.routes.js";
import timerRoutes from "./routes/timer.routes.js";
// import playerRoutes from "./routes/player.routes.js";
import questionsRoutes from "./routes/questions.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static assets
app.use(express.static(path.join(__dirname, "../public")));

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/", homeRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/editor", editorRoutes);
app.use("/builder", builderRoutes);
app.use("/timer", timerRoutes);
// app.use("/player", playerRoutes);
app.use("/questions", questionsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Workshop running at http://localhost:${PORT}`);
});