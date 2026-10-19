import sharp from 'sharp';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('..');
const output = path.resolve('public/images');
const resources = path.join(root, 'Resources');
const entries = [
  ['profile/portrait.webp', path.join(resources, 'my image.jpeg'), 1000],
  ['profile/editorial.webp', path.resolve('docs/source/editorial-portrait.png'), 880],
  ['certificates/cim-social.webp', path.join(resources, 'Badges/Screen Shot 2026-10-17 at 7.58.56 AM.png'), 600],
  ['certificates/cim-responsible.webp', path.join(resources, 'Badges/Screen Shot 2026-10-17 at 8.09.09 AM.png'), 600],
  ['certificates/google-display-badge.webp', path.join(resources, 'Badges/Screen Shot 2026-10-17 at 9.00.02 AM.png'), 600],
  ...[
    ['cybersecurity','8.15.20'], ['apidm','8.17.13'], ['cmi-digital','8.27.31'],
    ['hootsuite-social','8.28.47'], ['ga4','8.29.54'], ['google-display','9.01.22'],
  ].map(([name,time])=>[`certificates/${name}.webp`,path.join(resources,`Cetificates/Screen Shot 2026-10-17 at ${time} AM.png`),1200]),
  ...[
    ['project-management','dp.jpg'], ['digital-foundations','linkedinCertificate.jpeg'],
    ['email-marketing','Email.jpg'], ['power-bi','powerbi.jpg'], ['seo','seo.jpg'],
  ].map(([name,file])=>[`certificates/${name}.webp`,path.join(root,`old details/images/project/${file}`),1500]),
  ...[
    ['nike','8.44.42'],['mcdonalds','8.48.15'],['dove','8.49.30'],
    ['starbucks','8.51.55'],['apple','8.54.49'],['coca-cola','8.56.10'],
  ].map(([name,time])=>[`articles/${name}.webp`,path.join(resources,`Medium/Screen Shot 2026-10-17 at ${time} AM.png`),1000]),
];
const manifest = [];
for (const [target,source,width] of entries) {
  await mkdir(path.dirname(path.join(output,target)), {recursive:true});
  await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality:86}).toFile(path.join(output,target));
  manifest.push({asset:`images/${target}`,source:path.relative(root,source).replaceAll('\\','/')});
}
await mkdir('docs',{recursive:true});
await writeFile('docs/asset-provenance.json',JSON.stringify(manifest,null,2));
await copyFile('node_modules/@fontsource-variable/manrope/LICENSE','public/fonts/Manrope-LICENSE.txt');
await copyFile('node_modules/@fontsource-variable/dm-sans/LICENSE','public/fonts/DM-Sans-LICENSE.txt');
console.log(`Prepared ${entries.length} optimized assets. Original files preserved.`);
