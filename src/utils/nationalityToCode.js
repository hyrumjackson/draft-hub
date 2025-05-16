import { getCode } from 'country-list';

const aliases = {
  usa: 'United States of America',
  us: 'United States of America',
  america: 'United States of America',
  uk: 'United Kingdom',
  britain: 'United Kingdom',
  england: 'United Kingdom',
  uae: 'United Arab Emirates',
  drc: 'Democratic Republic of the Congo',
  prc: 'China',
  russia: 'Russian Federation',
  iran: 'Iran, Islamic Republic of',
  venezuela: 'Venezuela, Bolivarian Republic of',
  southafrica: 'South Africa',
  sa: 'Saudi Arabia',
  aus: 'Australia',
  nz: 'New Zealand',
  korea: 'South Korea',
  southkorea: 'South Korea',
  northkorea: 'North Korea',
  roc: 'Taiwan',
  syria: 'Syrian Arab Republic',
  laos: 'Lao People\'s Democratic Republic',
  myanmar: 'Myanmar',
  burma: 'Myanmar',
  ivorycoast: 'Côte d\'Ivoire',
  czech: 'Czech Republic',
  slovakia: 'Slovakia',
  vietnam: 'Viet Nam',
  bolivia: 'Bolivia, Plurinational State of',
  tanzania: 'Tanzania, United Republic of',
  moldova: 'Moldova, Republic of',
  palestine: 'Palestine, State of',
  brunei: 'Brunei Darussalam',
  'capeverde': 'Cabo Verde',
  'easttimor': 'Timor-Leste',
  macedonia: 'North Macedonia',
  swaziland: 'Eswatini',
};

export function getCountryCode(nationality) {
  if (!nationality) return 'xx';
  const cleanInput = nationality.trim().toLowerCase().replace(/[\s\-]/g, '');
  const normalized = aliases[cleanInput] || nationality.trim();
  const code = getCode(normalized);
  return code ? code.toLowerCase() : 'xx';
}