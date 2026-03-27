import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import homeRoutes from "./routes/home.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import editorRoutes from "./routes/editor.routes.js";
import builderRoutes from "./routes/builder.routes.js";
import timerRoutes from "./routes/timer.routes.js";
import playerRoutes from "./routes/player.routes.js";
import createRoutes from "./routes/create.routes.js";
import imagesRoutes from "./routes/images.routes.js";
import pushRoutes from "./routes/push.routes.js";
import editorUiRoutes from "./routes/editorUi.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static assets
app.use(express.static(path.join(__dirname, "../public")));
app.use("/node_modules", express.static("node_modules"));
app.use("/workspace", express.static("public/workspace"));
// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.use('/ui', editorUiRoutes);   // 👈 FIRST
app.use("/editor", editorRoutes);
app.use("/builder", builderRoutes);
app.use("/timings", timerRoutes);
app.use("/player", playerRoutes);
app.use('/create', createRoutes);
app.use('/images', imagesRoutes);
app.use('/push', pushRoutes);

app.use("/", homeRoutes);          // 👈 ALWAYS LAST


app.listen(PORT, () => {
  console.log(`🚀 Workshop running at http://localhost:${PORT}`);
});