const { Worker } = require("worker_threads");

const formidable = require("formidable");

exports.uploadFile = async (req, res) => {
  new formidable.IncomingForm({
    uploadDir: req.dirname + "/tempFiles",
    keepExtensions: true,
  })
    .parse(req)
    .on("file", async (name, file) => {
      console.log(file.path);

      const filePath = await file.path;

      result = new Promise((resolve, reject) => {
        const worker = new Worker(`./worker/excelWorker.js`, {
          workerData: filePath,
        });
        worker.on("message", (data) => {
          worker.terminate();
          resolve(data);
        });
        worker.on("error", reject);
        worker.on("exit", (code) => {
          if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
      });

      const message = await result;

      res.json({
        message,
      });
    });
};
