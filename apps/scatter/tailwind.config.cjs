module.exports = {
	theme: {
		extend: {
			fontFamily: {
				money: ['MoneyFont3', 'sans-serif'],
			},
		},
	},
	plugins: [],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'../../packages/components-ui-html/src/**/*.{html,js,svelte,ts}',
		'../../packages/components-shared/src/**/*.{html,js,svelte,ts}',
		// add other relevant paths if needed
	],
};
