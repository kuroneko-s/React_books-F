process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

process.on("unhandledRejection", (err) => {
  throw err;
});

require("../config/env");
const fs = require("fs-extra");
const webpack = require("webpack");
const paths = require("../config/paths");
const config = require("../config/webpack.config.server");

function build() {
  console.log("Creating server build");
  fs.emptyDirSync(paths.ssrBuild);
  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, status) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(status.toString());
    });
  });
}

build();
