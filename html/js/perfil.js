// perfil.js
const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const profileCard = document.getElementById('profileCard');
  const logoutLink = document.getElementById('logoutLink');
  const balanceAmount = document.getElementById('balanceAmount');

  // Campos do perfil
  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileCPF = document.getElementById('profileCPF');
  const profileCourse = document.getElementById('profileCourse');
  const profileInstitution = document.getElementById('profileInstitution');
  const profileAddress = document.getElementById('profileAddress');

    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        try {
        localStorage.removeItem('studentId');
        localStorage.removeItem('authToken');
        localStorage.removeItem('studentName');
        localStorage.removeItem('studentEmail');
        // ou localStorage.clear(); se quiser limpar tudo
        } catch (err) {
        console.warn('Erro ao limpar localStorage no logout:', err);
        }
        window.location.href = '../index.html';
    });


  function showError(msg) {
    loadingEl.style.display = 'none';
    profileCard.style.display = 'none';
    errorEl.style.display = 'block';
    errorEl.textContent = msg;
  }

  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem('authToken');
    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    return res;
  }

  async function loadProfile(studentId) {
    try {
      loadingEl.style.display = 'block';
      errorEl.style.display = 'none';
      profileCard.style.display = 'none';

      const url = `${API_BASE}students/student/${encodeURIComponent(studentId)}`;
      const resp = await fetchJson(url);
      if (!resp.ok) {
        if (resp.status === 401) {
          showError('Sessão expirada. Faça login novamente.');
          setTimeout(() => window.location.href = '../login.html', 1500);
          return;
        } else if (resp.status === 404) {
          showError('Aluno não encontrado.');
          return;
        } else {
          showError('Erro ao carregar perfil do aluno.');
          return;
        }
      }

      const data = await resp.json();
      loadingEl.style.display = 'none';
      profileCard.style.display = 'flex';

      // Preencher informações
      profileName.textContent = data.name || '—';
      profileEmail.textContent = data.email || '—';
      profileCPF.textContent = data.document || '—';
      profileCourse.textContent = data.course || '—';
      profileInstitution.textContent = data.institutionName || `#${data.institutionId || '—'}`;
      profileAddress.textContent = data.address || '—';

      // Avatar (iniciais)
      const initials = (data.name || '--').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      profileAvatar.textContent = initials;

      // Exibe saldo
      const score = data.score != null ? data.score : (data.saldo != null ? data.saldo : null);
      balanceAmount.textContent = score != null ? `${Number(score).toLocaleString('pt-BR')} ` : '—';
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
      showError('Erro ao carregar dados. Verifique sua conexão.');
    }
  }

  // Recupera o id do aluno
  const studentId = localStorage.getItem('studentId');
  if (!studentId) {
    window.location.href = '../login.html';
    return;
  }

  loadProfile(studentId);
});
