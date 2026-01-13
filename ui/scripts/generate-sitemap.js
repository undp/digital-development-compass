const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://digitaldevelopmentcompass.undp.org';
const BASE_PATH =  '';
const OUTPUT_DIR = path.join(__dirname, '..', 'public');

function parseCSVLine(line) {
  const columns = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      columns.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  columns.push(current);
  return columns;
}

function getCountries() {
  try {
    const csvPath = path.join(__dirname, '..', '..', 'data', 'Countries.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8');
    const lines = csvData.split('\n').slice(1);
    
    const countries = [];
    for (const line of lines) {
      if (!line.trim()) continue;
      
      const columns = parseCSVLine(line);
      if (columns.length > 12) {
        const isoAlpha3 = columns[12].trim().toLowerCase();
        const countryName = columns[9].trim();
        
        if (isoAlpha3 && isoAlpha3.length === 3) {
          countries.push({
            slug: isoAlpha3,
            name: countryName
          });
        }
      }
    }
    
    console.log(`Found ${countries.length} countries`);
    return countries;
  } catch (error) {
    console.error('Error reading countries:', error);
    return [];
  }
}

function generateSitemap() {
  const countries = getCountries();
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    { url: '', changefreq: 'monthly', priority: '1.0' },
    { url: '/about', changefreq: 'weekly', priority: '0.7' },
    { url: '/data', changefreq: 'weekly', priority: '0.7' },
    { url: '/methodology', changefreq: 'monthly', priority: '0.9' },
    { url: '/methodology/digital-development-compass', changefreq: 'monthly', priority: '0.9' },
    { url: '/methodology/digital-rights-dashboard', changefreq: 'monthly', priority: '0.9' },
    { url: '/disclaimer', changefreq: 'monthly', priority: '0.5' },
  ];
  
  const countryPages = countries.map(country => ({
    url: `/country/${country.slug.toUpperCase()}`,
    changefreq: 'monthly',
    priority: '0.8'
  }));
  
  const allPages = [...staticPages, ...countryPages];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${BASE_PATH}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
}

function writeSitemap() {
  const sitemap = generateSitemap();
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const outputPath = path.join(OUTPUT_DIR, 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf8');
  
  console.log(`✓ Sitemap generated successfully at: ${outputPath}`);
  console.log(`  Base URL: ${BASE_URL}${BASE_PATH}`);
  console.log(`  Total URLs: ${sitemap.split('<url>').length - 1}`);
}

if (require.main === module) {
  writeSitemap();
}

module.exports = { generateSitemap, getCountries };
