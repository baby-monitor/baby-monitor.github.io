const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  "entry": {
    "index": "./src/index.ts",
    "camera": "./src/scripts/camera.ts",
    "viewer": "./src/scripts/viewer.ts",
  },
  "module": {
    "rules": [
      {
        "test": /\.tsx?$/,
        "use": "ts-loader",
        "exclude": /node_modules/,
      },
    ],
  },
  "resolve": {
    "extensions": [".tsx", ".ts", ".js"]
  },
  "plugins": [
    new HtmlWebpackPlugin({
      title: "Baby Monitor",
      template: "./src/index.html",
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      title: "Baby Monitor",
      template: "./src/camera.html",
      chunks: ["camera"],
      filename: "camera.html",
    }),
    new HtmlWebpackPlugin({
      title: "Baby Monitor",
      template: "./src/viewer.html",
      chunks: ["viewer"],
      filename: "viewer.html",
    }),
  ],
  "output": {
    //"filename": "main.js",
    "path": path.resolve(__dirname, "dist"),
  }
}