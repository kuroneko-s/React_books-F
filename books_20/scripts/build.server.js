process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

// Promise가  reject, Error Handler가 없을때마다 동작
process.on("unhandledRejection", (err) => {
  throw err;
});

require("../config/env"); // 환경설정 가져오고 
const fs = require("fs-extra"); // file system extra
const webpack = require("webpack"); // webpack 경로 가져오고
const paths = require("../config/paths"); // paths 가져오고
const config = require("../config/webpack.config.server"); // webpack server용으로 정의한 파일 가져오고

function build() {
  console.log("Creating server build");
  fs.emptyDirSync(paths.ssrBuild); // 디렉토리가 empty인지 확인, empty가 아니면 empty로 만듦, 디렉토리가 없으면 디렉토리를 생성해줌
  let compiler = webpack(config); // webpack에 webapck server config 넘겨줌
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
