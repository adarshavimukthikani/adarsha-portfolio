import sharp from 'sharp';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Official artwork: preserve aspect ratios, colours, and identifying text.
const sources = [
  { id: 'ruhuna', name: 'University of Ruhuna', original: 'ruhuna-university.png', file: 'university-of-ruhuna.png', page: 'https://jobs.tec.ruh.ac.lk/', url: 'https://jobs.tec.ruh.ac.lk/images/uor-logo.png' },
  { id: 'cim', name: 'The Chartered Institute of Marketing', original: 'cim.png', file: 'cim.png', page: 'https://www.cim.co.uk/', url: 'https://www.cim.co.uk/media/xyfbmdjb/cim_logo_blue.png' },
  { id: 'circle-of-marketing', name: 'Circle of Marketing, University of Ruhuna', original: 'circle-of-marketing.png', file: 'circle-of-marketing.png', page: 'https://www.mgt.ruh.ac.lk/index.php/student/study-circles/circle-of-marketing', url: 'https://www.mgt.ruh.ac.lk/images/management_circle.png' },
  { id: 'photoshop', name: 'Adobe Photoshop', original: 'photoshop.png', file: 'photoshop.png', page: 'https://www.adobe.com/products/photoshop.html', url: 'old details/images/undraw/photoshop.png' },
  { id: 'canva', name: 'Canva', original: 'canva.svg', file: 'canva.svg', page: 'https://www.canva.com/newsroom/news/new-logo-canva/', url: 'https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg' },
  { id: 'google-ads', name: 'Google Ads', original: 'google-ads.svg', file: 'google-ads.svg', page: 'https://ads.google.com/home/', url: 'https://www.gstatic.com/images/branding/productlogos/ads/v5/192px.svg' },
  { id: 'google-analytics', name: 'Google Analytics', original: 'google-analytics.svg', file: 'google-analytics.svg', page: 'https://ads.google.com/home/', url: 'https://www.gstatic.com/images/branding/productlogos/google_analytics/v6/192px.svg' },
  { id: 'apidm', name: 'Asia Pacific Institute of Digital Marketing', original: 'apidm.svg', file: 'apidm.svg', page: 'https://apidm.asia/', url: 'https://apidm.asia/wp-content/themes/apidm/assets/images/logo.svg' },
  { id: 'ec-council', name: 'EC-Council', original: 'ec-council.webp', file: 'ec-council.webp', page: 'https://www.eccouncil.org/', url: 'https://cdn.eccouncil.org/wp-content/uploads/2023/01/26065702/ec-council-logo.png.webp' },
  { id: 'moratuwa', name: 'University of Moratuwa', original: 'moratuwa.png', file: 'university-of-moratuwa.png', page: 'https://www.uom.lk/', url: 'https://www.uom.lk/assets/images/logo_0.png' },
];

await mkdir('public/images/logos', { recursive: true });
await mkdir('public/images/campus', { recursive: true });
const manifest = [];
for (const source of sources) {
  const original = `docs/source/logos/${source.original}`;
  const asset = `images/logos/${source.file}`;
  const destination = `public/${asset}`;
  if (source.file.endsWith('.svg') || source.file.endsWith('.webp')) {
    const data = await readFile(original, source.file.endsWith('.svg') ? 'utf8' : undefined);
    if (source.file.endsWith('.svg') && /<script|<foreignObject|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|\/\/|javascript:)/i.test(data)) throw new Error(`Unexpected active or remote content in ${source.file}`);
    await copyFile(original, destination);
  } else {
    const image = sharp(original);
    if (source.id === 'ruhuna') image.resize({ height: 400, withoutEnlargement: true });
    if (source.id === 'photoshop') image.trim().resize({width:192,height:192,fit:'contain',background:{r:0,g:0,b:0,alpha:0}});
    await image.png({ compressionLevel: 9 }).toFile(destination);
  }
  const data = await readFile(destination);
  const { width, height } = await sharp(data).metadata();
  manifest.push({ ...source, asset, width, height, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex'), retrieved: '2026-10-18', sourceType: source.id === 'photoshop' ? 'User-supplied software artwork from the legacy project' : 'Official brand or university website', processing: source.id === 'photoshop' ? 'Transparent margins cropped, fitted to 192 pixels, PNG encoded; artwork retained' : source.id === 'ruhuna' ? 'Proportionally resized to 400 pixels high for web display, then losslessly PNG encoded; no recolouring' : source.file.endsWith('.png') ? 'Lossless PNG encoding; original artwork and colours retained' : 'Original file copied without changes', rights: 'Trademark and artwork rights remain with the respective owner. Used to identify education, learning, or software; no endorsement implied.' });
}

const campusAsset = 'images/campus/ruhuna-management.webp';
await sharp('docs/source/logos/campus.jpg').resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/${campusAsset}`);
const campus = await readFile(`public/${campusAsset}`);
const campusMeta = await sharp(campus).metadata();
manifest.push({ id: 'ruhuna-campus', name: 'Faculty of Management and Finance campus, University of Ruhuna', asset: campusAsset, original: 'campus.jpg', page: 'https://www.mgt.ruh.ac.lk/', url: 'https://www.mgt.ruh.ac.lk/images/stu-down/Fac_of_MF.jpg', width: campusMeta.width, height: campusMeta.height, bytes: campus.length, sha256: createHash('sha256').update(campus).digest('hex'), retrieved: '2026-10-18', sourceType: 'Official faculty website homepage photograph', processing: 'Resized to 1440 pixels wide and encoded as WebP; no generated imagery', rights: 'University website photograph. No open reuse licence was supplied. Copyright remains with its owner. Source credited beside the image.' });

await writeFile('docs/logo-assets.json', JSON.stringify(manifest, null, 2) + '\n');
const provenance = JSON.parse(await readFile('docs/asset-provenance.json', 'utf8'));
const retained = provenance.filter(item => !item.asset.startsWith('images/logos/') && !item.asset.startsWith('images/campus/')); 
await writeFile('docs/asset-provenance.json', JSON.stringify([...retained, ...manifest.map(({ asset, page, url, retrieved, rights }) => ({ asset, source: url, sourcePage: page, retrieved, rights }))], null, 2) + '\n');
console.log(`Prepared ${sources.length} authentic logos and one campus photograph (${Math.round(manifest.reduce((total, item) => total + item.bytes, 0) / 1024)} KB total).`);
