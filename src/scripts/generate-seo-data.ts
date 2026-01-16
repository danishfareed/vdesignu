import fs from 'fs';
import path from 'path';
import { cities, industries, services } from '../config/site-config';

const generateData = () => {
  const combinations = [];
  const tier1Industries = industries.tier1;

  for (const city of cities) {
    for (const industry of tier1Industries) {
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
          metaDescription: `Premium ${service.name} solutions tailored for the ${industry.name} sector in ${city.name}. Engineering growth for B2B industrial leaders in ${city.country}.`,
          h1: `${service.name} Specialists for ${industry.name} & Mechanical Sectors in ${city.name}`
        });
      }
    }
  }

  const dataPath = path.resolve('src/data/seo-combinations.json');
  fs.writeFileSync(dataPath, JSON.stringify(combinations, null, 2));
  console.log(`Generated ${combinations.length} SEO combinations.`);
};

generateData();
