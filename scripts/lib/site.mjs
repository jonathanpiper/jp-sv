// Shared setup for scripts that reuse the website's own code. Importing this module makes
// src/lib/index.ts and src/lib/config.ts loadable from plain Node (via Node's built-in
// TypeScript type stripping, Node 23.6+), and exports them, so scripts and the site share one
// source of truth for things like the Bunny library ID.
//
//   import { rootDir, siteLib, siteConfig } from './lib/site.mjs'

import { registerHooks } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/** The repository root */
export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
/** src/lib — posts, pages, and the site's shared TypeScript */
export const libDir = path.join(rootDir, 'src/lib');

// Resolve the SvelteKit-only specifiers used by $lib/index.ts and $lib/config.ts so they can be
// imported outside of Vite: `$lib/x` maps to src/lib/x.ts, and `$app/environment` gets a stub
// with dev = false (so `url` in config.ts is the production site URL).
registerHooks({
	resolve(specifier, context, nextResolve) {
		if (specifier === '$app/environment') {
			return { url: 'data:text/javascript,export const dev = false', shortCircuit: true };
		}
		if (specifier.startsWith('$lib/')) {
			const file = path.join(libDir, `${specifier.slice('$lib/'.length)}.ts`);
			return { url: pathToFileURL(file).href, shortCircuit: true };
		}
		return nextResolve(specifier, context);
	}
});

// Dynamic imports, so they run after the hooks above are registered
/** src/lib/index.ts */
export const siteLib = await import('$lib/index');
/** src/lib/config.ts */
export const siteConfig = await import('$lib/config');
