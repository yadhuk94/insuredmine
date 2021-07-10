// const { exec } = require("node-os-utils");
const pidusage = require("pidusage");
const { exec } = require("child_process");

module.exports = (thread, dir) => {
  const interval = setInterval(() => {
    pidusage(process.pid, function (err, stats) {
      console.log(`${thread}: ${stats.cpu}%, ${process.pid}`);
      if (stats.cpu > 70)
        exec(`taskkill /F /PID ${process.pid} | node ${dir}/app.js`);
    });
  }, 1000);
  interval.unref();
};
