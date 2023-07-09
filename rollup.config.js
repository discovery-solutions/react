exports.default = {
	input: "ts-out/index.js",
	preserveEntrySignatures: "strict",
	output: [{
		file: "dist/index.cjs.js",
		format: "cjs"
	}, {
		file: "dist/index.es.js",
		format: "es"
	}]
};