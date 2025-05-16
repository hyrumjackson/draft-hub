import { getCode } from 'country-list';

export function getCountryCode(nationality) {
  if (!nationality) return 'xx';
  const code = getCode(nationality.trim());
  return code ? code.toLowerCase() : 'xx';
}