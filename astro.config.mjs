import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'

import webmanifest from 'astro-webmanifest'

// https://astro.build/config
export default defineConfig({
	site: 'https://i2mx.github.io',
  base: '/tt',
	integrations: [
		tailwind(),
		solidJs(),
		webmanifest({
			name: 'timetabler',
			icon: 'public/favicon.png', // source for favicon & icons
			short_name: 'timetabler',
			description: 'an app to display a kamar timetable',
			start_url: '/tt/',
			theme_color: '#fca5a5',
			background_color: '#ffffff',
			display: 'standalone'
		})
	]
})
