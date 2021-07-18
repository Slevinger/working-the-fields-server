var fs = require("fs");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const surpriseRoutes = require("./module/surprise/surprise.routes");
const statistics = require("./module/surprise/services/statistics");

const PORT = process.env.PORT || 3000;
let server;

(async () => {
  try {
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/health", (req, res) => {
      const message = {
        version: module.exports.version,
        message: "OK",
      };
      res.status(200).send(message);
    });

    app.use(notFoundMiddleware);
    app.use(errorHandler);

    // app.use(statisticsMiddleWare);

    server = app.listen(PORT, () => {
      console.info(`Start listening on port ${PORT}!`);
      console.info(`Node version: ${process.version}`);
    });

    process.on("SIGTERM", async function () {
      console.log("SIGTERM signal received. shutting down gracefully");
      const stringJSON = JSON.stringify(statistics.list);
      fs.writeFileSync(__dirname + "/db.json", stringJSON, "utf8");
      console.log("saved data", stringJSON);
      server.close(() => {
        console.log("Closed out remaining http connections");
        console.log("closed db connection");
        process.exit(0);
      });
    });
    console.log("All required components initialized successfully");
  } catch (error) {
    console.error("Failed initializing modules components", error);
    process.exit(1);
  }
})();

process.on("uncaughtException", (e) => {
  console.error("Unexpected server error", e);
  process.exit(1);
});
