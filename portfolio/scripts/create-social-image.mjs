import sharp from 'sharp';
// A type-led sharing image, without repeating the original portrait.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#2c211d"/>
<text x="68" y="95" font-family="Arial,sans-serif" font-size="30" font-weight="bold" fill="#f6f3ec">adarsha<tspan fill="#d0f344">.</tspan></text>
<path d="M68 134h1064" stroke="#6b5a4d"/>
<text x="65" y="260" font-family="Arial,sans-serif" font-size="91" font-weight="bold" letter-spacing="-5" fill="#f6f3ec">Business mind.</text>
<rect x="61" y="292" width="695" height="124" rx="28" fill="#d0f344" transform="rotate(-2 61 292)"/>
<text x="82" y="383" font-family="Arial,sans-serif" font-size="91" font-weight="bold" letter-spacing="-5" fill="#2c211d">Creative eye.</text>
<circle cx="1000" cy="320" r="108" fill="#c2d8e5"/>
<path d="M1000 265v110m-55-55h110m-94-39 78 78m-78 0 78-78" stroke="#2c211d" stroke-width="10" stroke-linecap="round"/>
<text x="68" y="518" font-family="Arial,sans-serif" font-size="28" fill="#f6f3ec">Adarsha Vimukthikani</text>
<text x="68" y="561" font-family="Arial,sans-serif" font-size="16" letter-spacing="3" fill="#d0c7bc">MANAGEMENT / MARKETING / CREATIVE COMMUNICATION</text>
</svg>`;
await sharp(Buffer.from(svg)).webp({quality:90}).toFile('public/images/social-preview.webp');
console.log('Social sharing image created.');
