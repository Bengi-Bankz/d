// Don't convert this to a ts file, because of this https://github.com/vitejs/vite/issues/5370
import { sveltekit } from '@sveltejs/kit/vite';
import { lingui } from '@lingui/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const NODE_ENV = process.env.NODE_ENV;
let dev = NODE_ENV === 'development';

import path from 'path';

export default () =>
	defineConfig({
		plugins: [sveltekit(), lingui(), tailwindcss()],
		logLevel: 'info',
		build: {
			assetsInlineLimit: Infinity,
			sourcemap: dev ? true : false,
			output: {
				sourcemap: dev ? true : false,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
		server: {
			fs: {
				allow: [
					path.resolve(__dirname, '../../apps/scatter/static'),
					path.resolve(__dirname, '../../apps/scatter/src'),
					path.resolve(__dirname, '../../apps/scatter/node_modules'),
					path.resolve(__dirname, '../../node_modules'),
				]
			}
		}
	});
