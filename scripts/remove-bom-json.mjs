// scripts/remove-bom-json.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function stripBom(str) {
    return str.replace(/^\uFEFF/, '');
}

function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = fs.statSync(full);

        if (stat.isDirectory()) {
            if (['node_modules', '.git', 'dist', '.nx'].includes(entry)) continue;
            walk(full);
        } else if (entry.endsWith('.json')) {
            const content = fs.readFileSync(full, 'utf8');
            const cleaned = stripBom(content);
            if (cleaned !== content) {
                fs.writeFileSync(full, cleaned, 'utf8');
                console.log('BOM removed:', full);
            }
        }
    }
}

walk(root);
