import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=readFileSync(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(ids.length,new Set(ids).size,'IDs HTML duplicados');
for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  if(/^(https?:|data:)/.test(m[1]))continue;
  assert.ok(existsSync(path.join(root,m[1])),`Arquivo local ausente: ${m[1]}`);
}
const css=readFileSync(path.join(root,'assets/fonts.css'),'utf8');
for(const m of css.matchAll(/url\(([^)]+)\)/g))assert.ok(existsSync(path.join(root,'assets',m[1])),`Fonte ausente: ${m[1]}`);
assert.ok(existsSync(path.join(root,'assets/three.module.js')),'Three.js ausente');
console.log('Referências HTML, fontes locais, Three.js e IDs verificados.');
