import {mkdirSync,copyFileSync,cpSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist');
mkdirSync(output,{recursive:true});
for(const name of ['index.html','style.css','app.js','models.js','robots.txt','.htaccess'])copyFileSync(path.join(root,name),path.join(output,name));
cpSync(path.join(root,'assets'),path.join(output,'assets'),{recursive:true});
console.log('Site estático preparado em dist/. Não é necessário build para implantação Git na Hostinger.');
