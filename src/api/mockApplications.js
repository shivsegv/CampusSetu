const KEY = 'cs_applications';

function load() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
function save(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export async function createApplication({ jobId, studentId, resumeUrl, cover }) {
  const apps = load();
  const id = apps.length ? Math.max(...apps.map(a => a.id)) + 1 : 1;
  const newApp = {
    id,
    jobId: Number(jobId),
    studentId: Number(studentId),
    resumeUrl: resumeUrl || '',
    cover: cover || '',
    status: 'applied',
    appliedAt: new Date().toISOString()
  };
  apps.push(newApp);
  save(apps);
  return new Promise(resolve => setTimeout(() => resolve(newApp), 150));
}

export async function getApplicationsByStudentId(studentId) {
  const apps = load().filter(a => Number(a.studentId) === Number(studentId));
  return new Promise(resolve => setTimeout(() => resolve(apps), 80));
}
