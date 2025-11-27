// professor-perfil.js
// Carrega dados do professor e estatísticas usando as rotas do backend

const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const professorId = localStorage.getItem('professorId');
  if (!professorId) {
    window.location.href = '../login/login-professor.html';
    return;
  }

  const sel = (s) => document.querySelector(s);

  const balanceEl = sel('.balance-display .balance-amount') || sel('#balanceAmount');
  const profileNameEl = sel('#profileName');
  const profileEmailEl = sel('#profileEmail');
  const profileCpfEl = sel('#profileCpf');
  const profileDeptEl = sel('#profileDept');
  const profileInstEl = sel('#profileInst');
  const profileAvatarEl = sel('#profileAvatar') || sel('.profile-avatar');
  const statDistributedEl = sel('#statDistributed');
  const statStudentsEl = sel('#statStudents');
  const statRemainingEl = sel('#statRemaining');

  function maskCpf(cpf) {
    const d = String(cpf || '').replace(/\D/g, '').padStart(11, '0');
    return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  function initials(name) {
    if (!name) return 'PR';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase()).join('') || 'PR';
  }

  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem('authToken');
    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    return res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
  }

  (async () => {
    try {
      const [prof, balance, totalSent, txs] = await Promise.all([
        fetchJson(`${API_BASE}professors/professor/${professorId}`),
        fetchJson(`${API_BASE}professors/professor/${professorId}/balance`),
        fetchJson(`${API_BASE}transactions/professor/${professorId}/total`).catch(() => 0),
        fetchJson(`${API_BASE}transactions/professor/${professorId}`).catch(() => [])
      ]);

      // Perfil
      if (profileNameEl) profileNameEl.textContent = prof?.name || 'Professor';
      if (profileEmailEl) profileEmailEl.textContent = prof?.email || '-';
      if (profileCpfEl) profileCpfEl.textContent = maskCpf(prof?.socialId || '');
      if (profileDeptEl) profileDeptEl.textContent = prof?.department || '-';
      if (profileInstEl) profileInstEl.textContent = prof?.institutionName || '-';
      if (profileAvatarEl) profileAvatarEl.textContent = initials(prof?.name);

      // Saldo
      const saldo = Number(balance || prof?.score || 0);
      if (balanceEl) balanceEl.textContent = String(saldo);

      // Estatísticas
      const total = Number(totalSent || 0);
      const uniqueStudents = new Set((txs || []).map(t => t.studentId)).size;
      const remaining = Math.max(0, saldo);
      if (statDistributedEl) statDistributedEl.textContent = String(total);
      if (statStudentsEl) statStudentsEl.textContent = String(uniqueStudents);
      if (statRemainingEl) statRemainingEl.textContent = String(remaining);
    } catch (err) {
      console.error('Erro ao carregar perfil do professor:', err);
    }
  })();
});

