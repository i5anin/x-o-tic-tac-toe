import {readdir, readFile, stat} from 'node:fs/promises';
import {resolve, relative, sep, extname} from 'node:path';
import {fileURLToPath} from 'node:url';

const CWD = process.cwd();
const DEFAULT_ROOT = 'src';
const EXCLUDES = new Set(['node_modules', '.git', '.idea', 'dist', 'build', '.next', '.nuxt', 'coverage', '.cache']);
const TEXT_EXTS = new Set([
	'.js','.mjs','.cjs','.ts','.mts','.cts','.jsx','.tsx',
	'.vue','.json','.yaml','.yml','.md','.txt','.css','.scss','.sass','.less',
	'.html','.htm','.php','.py','.rb','.go','.java','.cs','.env','.ini','.cfg',
	'.sql','.graphql','.gql','.sh','.bat','.ps1','.xml','.svg'
]);

const isProbablyText = p => TEXT_EXTS.has(extname(p).toLowerCase());

const toPosix = p => p.split(sep).join('/');

async function walk(dir, rootAbs, acc) {
	const entries = await readdir(dir, {withFileTypes: true});
	const tasks = entries.map(async entry => {
		if (EXCLUDES.has(entry.name)) return;
		const full = resolve(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, rootAbs, acc);
			return;
		}
		if (!entry.isFile()) return;
		const rel = toPosix(relative(rootAbs, full));
		const name = entry.name;
		let content;
		if (isProbablyText(full)) {
			content = await readFile(full, 'utf8');
		} else {
			const s = await stat(full);
			if (s.size > 2 * 1024 * 1024) return; // пропуск файлов >2MB
			const buf = await readFile(full);
			content = `data:base64,${buf.toString('base64')}`;
		}
		acc.push({path: rel, name, content});
	});
	await Promise.all(tasks);
}

async function collect(rootDir = DEFAULT_ROOT) {
	const rootAbs = resolve(CWD, rootDir);
	const items = [];
	await walk(rootAbs, rootAbs, items);
	return items;
}

if (import.meta.url === `file://${fileURLToPath(import.meta.url)}`) {
	const root = process.argv[2] || DEFAULT_ROOT;
	const data = await collect(root);
	process.stdout.write(JSON.stringify(data, null, 2));
}

export { collect };
