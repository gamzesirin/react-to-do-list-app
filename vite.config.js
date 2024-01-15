import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // SVG eklentisi

export default defineConfig({
	plugins: [react(), svgr()] // React ve SVG eklentilerini etkinleştirin
})
