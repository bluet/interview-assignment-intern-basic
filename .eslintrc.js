module.exports = {
	env: {
		"es6": true,
		"node": true,
		"browser": true,
		"es2020": true,
		"mongo": true,
		"shared-node-browser": true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	rules: {
		"indent": [
			"error",
			"tab",
			{
				VariableDeclarator: "first",
			},
		],
		"linebreak-style": ["error", "unix"],
		"curly": "error",
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"no-console": [
			"warn",
			{
				allow: ["warn", "error", "info"],
			},
		],
		"brace-style": [
			"error",
			"1tbs",
			{
				allowSingleLine: true,
			},
		],
		"no-unused-vars": [
			"warn",
			{
				vars: "all",
				args: "after-used",
				ignoreRestSiblings: false,
			},
		],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"no-trailing-spaces": "error",
		"arrow-parens": ["error", "always"],
		"arrow-body-style": ["warn", "always"],
		"func-style": [
			"warn",
			"declaration",
			{
				allowArrowFunctions: true,
			},
		],
		"no-confusing-arrow": [
			"error",
			{
				allowParens: false,
			},
		],
		"arrow-spacing": "error",
		"prefer-arrow-callback": "warn",
		"require-await": "error",
	},
};
