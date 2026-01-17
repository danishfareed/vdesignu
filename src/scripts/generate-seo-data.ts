import fs from 'fs';
import path from 'path';
import { cities, industries, services } from '../config/site-config';

const generateData = () => {
  const combinations = [];
  for (const city of cities) {
    for (const industry of industries) {
      for (const service of services) {
        combinations.push({
          city: city.slug,
          cityName: city.name,
          country: city.country,
          industry: industry.slug,
          industryName: industry.name,
          service: service.slug,
          serviceName: service.name,
          slug: `${city.slug}/${industry.slug}/${service.slug}`,
          // Initial metadata for content injection
          metaTitle: `${service.name} for ${industry.name} in ${city.name} | vdesignu`,
          metaDescription: `Premium ${service.name} solutions tailored for the ${industry.name} sector in ${city.name}. Engineering growth for B2B and B2C brands in ${city.country}.`,
          h1: `${service.name} Specialists for ${industry.name} Sectors in ${city.name}`
        });
      }
    }
  }

  const dataPath = path.resolve('src/data/seo-combinations.json');
  fs.writeFileSync(dataPath, JSON.stringify(combinations, null, 2));
  console.log(`Generated ${combinations.length} SEO combinations.`);
};

generateData();
