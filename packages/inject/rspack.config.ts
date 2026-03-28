import { defineConfig } from "@rspack/cli";
import { join } from "path";
import { fileURLToPath } from "url";
import { tsloader } from "../scramjet/rspack.config.ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const injectdir = __dirname;

const cssloader = {
	test: /\.css$/,
	type: "asset/source",
};

export default defineConfig({
	entry: join(injectdir, "src/index.ts"),
	devtool: "source-map",
	target: "web",
	mode: "development",
	output: {
		filename: "inject.js",
		path: join(injectdir, "dist"),
		iife: true,
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			tsloader,
			cssloader,
			{
				test: /\.html$/,
				type: "asset/source",
			},
		],
	},
	performance: {
		hints: false,
	},
});
