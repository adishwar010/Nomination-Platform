const express = require("express");
const app = express();
const path = require("path");
const os = require("os");
const cluster = require("cluster");
const loader = require("./loaders");

var timeout = require("connect-timeout");
app.use(timeout("1000s"));

const clusterWorkerSize = os.cpus().length;

const PORT = process.env.PORT || 5000;

async function startServer() {
  await loader({ app });
}

// Distributing load between various cpus.
if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on("exit", function (worker) {
      console.log("Worker", worker.id, " has exitted.");
    });
  } else {
    //const app = express();

    app.listen(PORT, function () {
      console.log(
        `Express server listening on port ${PORT} and worker ${process.pid}`
      );
    });
  }
} else {
  app.listen(PORT, function () {
    console.log(
      `Express server listening on port ${PORT} with the single worker ${process.pid}`
    );
  });
}

startServer();
