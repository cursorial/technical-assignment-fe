const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	cache: true,
	devtool: "source-map",
	devServer: {
		static: './'
	},
	resolve: {
		extensions: [".js"]
	},
	entry: {
		index: ["./src/js/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js",
		sourceMapFilename: "[file].map"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
			favicon: path.resolve(__dirname, "public", "favicon.ico")
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new ESLintPlugin()
	],
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: ["babel-loader"]
			},
			{
				test: /\.(png|jpg|gif)$/i,
				type: 'asset/resource'
			}
		]
	}
};
