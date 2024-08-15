module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	rules: {
		'prettier/prettier': 'error',
		"@typescript-eslint/no-non-null-assertion": "off",
		"security/detect-object-injection": "off",
		"security/detect-non-literal-fs-filename": "off",
		"security/detect-unsafe-regex": "off",
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
