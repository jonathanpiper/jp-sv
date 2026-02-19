import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

// import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars';
export default defineConfig({ plugins: [tailwindcss(), sveltekit(), enhancedImages()] });
