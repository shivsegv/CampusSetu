import companies from '../data/companies.json';

export async function getCompanyById(id) {
  const c = companies.find(x => Number(x.id) === Number(id)) || null;
  return new Promise(resolve => setTimeout(() => resolve(c), 80));
}
