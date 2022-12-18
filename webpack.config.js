const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "main.ts"),
    output: {
        path: path.resolve(__dirname, "build"),
        clean: true,
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "build"),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src/index.html") })],
    mode: "development",
};
