// Mock recruitment history for last 3 years and dummy companies

export const getRecruitmentHistory = async () => {
  await new Promise((r) => setTimeout(r, 300));

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const yearlyStats = [
    {
      year: years[0],
      totalPlacements: 145,
      companiesVisited: 28,
      successRate: 0.54,
    },
    {
      year: years[1],
      totalPlacements: 172,
      companiesVisited: 32,
      successRate: 0.58,
    },
    {
      year: years[2],
      totalPlacements: 198,
      companiesVisited: 36,
      successRate: 0.61,
    },
  ];

  const companies = [
    { id: 'cmp-1', name: 'TechNova Labs', hires: 22, offers: 26, successRate: 0.65 },
    { id: 'cmp-2', name: 'BluePeak Systems', hires: 18, offers: 20, successRate: 0.72 },
    { id: 'cmp-3', name: 'Orbit Softworks', hires: 15, offers: 17, successRate: 0.61 },
    { id: 'cmp-4', name: 'Apex FinTech', hires: 14, offers: 18, successRate: 0.56 },
    { id: 'cmp-5', name: 'Nimbus Cloud', hires: 12, offers: 15, successRate: 0.62 },
    { id: 'cmp-6', name: 'GreenByte AI', hires: 11, offers: 13, successRate: 0.68 },
    { id: 'cmp-7', name: 'Vector Dynamics', hires: 9, offers: 12, successRate: 0.52 },
    { id: 'cmp-8', name: 'Stellar Retail', hires: 8, offers: 10, successRate: 0.5 },
    { id: 'cmp-9', name: 'Quantum Health', hires: 7, offers: 9, successRate: 0.49 },
    { id: 'cmp-10', name: 'Linea Logistics', hires: 6, offers: 8, successRate: 0.46 },
  ];

  // Additional per-year breakdowns for year tabs
  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'MBA'];
  const locations = ['Bengaluru', 'Hyderabad', 'Pune', 'Delhi', 'Remote'];

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const funnelByYear = years.map((y, i) => ({
    year: y,
    applied: 600 + i * 80 + rand(-50, 50),
    shortlisted: 280 + i * 40 + rand(-30, 30),
    interview: 160 + i * 30 + rand(-20, 20),
    hired: yearlyStats[i].totalPlacements,
  }));

  const placementsByDeptByYear = years.map((y, i) => ({
    year: y,
    data: departments.map((d, idx) => ({ type: d, value: 15 + idx * 3 + i * 2 + rand(-2, 2) })),
  }));

  const jobsByLocationByYear = years.map((y, i) => ({
    year: y,
    data: locations.map((loc, idx) => ({ type: loc, value: 10 + idx * 2 + i * 1 + rand(-1, 2) })),
  }));

  return { yearlyStats, companies, funnelByYear, placementsByDeptByYear, jobsByLocationByYear, years };
};
