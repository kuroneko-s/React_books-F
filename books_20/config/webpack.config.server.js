const nodeExternals = require("webpack-node-externals");
const paths = require("./paths");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const webpack = require("webpack");
const getClientEnvironment = require("./env");

/*
    css 파일 내에서 로컬 clssName을 참조하거나 특정 경로가 필요한 경우에는 한곳에 몰아서 빌드해버리면 
    이상하게 적용될 수 있으므로 이것들도 따로 다 나눠서 적용해줘야함
*/

const cssRegex = /\.css$/;
const ccsModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// const env = getClientenvironment(paths.publicUrlOrPath.slice(0, -1));
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  mode: "production", // produc 환경, 최적화 옵션들 활성화
  entry: paths.ssrIndexJs, // 엔트리 경로
  target: "node", // 환경
  output: {
    path: paths.ssrBuild, // 빌드 경로
    filename: "server.js",
    chunkFilename: "js/[name].chunk.js", // 청크 파일 이름
    publicPath: paths.publicUrlOrPath, // 정적 파일 경로
  },

  // 로더들인듯 ?
  module: {
    rules: [
      {
        oneOf: [
          // JS를 위한 처리
          // webpack.config.js를 기반으로 작성
          {
            test: [/\.(js|mjs|jsx|ts|tsx)$/],
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides"
              ),
              presets: [
                [
                  require.resolve("babel-preset-react-app"),
                  {
                    runtime: "automatic",
                  },
                ],
              ],

              plugins: [
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                      },
                    },
                  },
                ],
              ],

              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },

          // CSS를 위한 처리
          {
            test: cssRegex,
            exclude: ccsModuleRegex,
            // exportOnlyLocals: true 옵셜을 설정하면 실제 css파일을 생성하지 않는다.
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
              },
            },
          },

          // CSS Module을 위한 처리
          {
            test: ccsModuleRegex,
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },

          // Sass를 위한 처리
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 3,
                  modules: {
                    exportOnlyLocals: true,
                  },
                },
              },
              require.resolve("sass-loader"),
            ],
          },

          // Sass + CSS Module을 위한 처리
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 3,
                  modules: {
                    exportOnlyLocals: true,
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
              },
              require.resolve("sass-loader"),
            ],
          },

          // url-loader를 위한 설정
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              emitFile: false, // 파일을 따로 저장하지 않는다는 옵션
              limit: 10000, // 기본 설정으로는 9.76KB가 넘어가면 파일로 저장하지만
              // emitFile 값이 false 인 경우 경로만 준비하고 파일은 저장하지 않는다.
              name: "static/media/[name].[hash:8].[ext]",
            },
          },

          //위 설정들을 제외한 파일들은 해당 옵션을 적용
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|mjs|jsx|ts|tsx$)/, /\.html$/, /\.json$/],
            options: {
              emitFile: false,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },

  // 코드에서 node_modules 내부의 라이브러리를 불러올 수 있게 설정
  // import를 써서 라이브러리들을 가져올 경우 node_modules를 참조한다.
  resolve: {
    modules: ["node_modules"],
  },
  externals: [
    nodeExternals({
      allowlist: [/@babel/], // 환경변수
    }),
  ],
};
