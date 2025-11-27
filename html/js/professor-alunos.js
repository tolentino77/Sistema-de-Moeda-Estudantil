// professor-alunos.js
// Lista alunos da instituição do professor e disponibiliza ação de enviar moedas

const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const professorId = localStorage.getItem('professorId');
  if (!professorId) {
    window.location.href = '../login/login-professor.html';
    return;
  }

  const table = document.querySelector('.table-container table') || document.querySelector('table');
  const tbody = table?.querySelector('tbody');
  if (tbody) tbody.innerHTML = '';

  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem('authToken');
    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    return res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
  }

  (async () => {
    try {
      const prof = await fetchJson(`${API_BASE}professors/professor/${professorId}`);
      const instId = prof?.institutionId;
      if (!instId) return;

      const students = await fetchJson(`${API_BASE}students/institution/${instId}`).catch(() => []);
      if (!tbody) return;

      if (!Array.isArray(students) || students.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 5;
        td.textContent = 'Nenhum aluno encontrado.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }

      students.forEach((st) => {
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.innerHTML = `<strong>${st.name || 'Aluno'}</strong>`;
        tr.appendChild(tdNome);

        const tdEmail = document.createElement('td');
        tdEmail.textContent = st.email || '-';
        tr.appendChild(tdEmail);

        const tdCurso = document.createElement('td');
        tdCurso.textContent = st.course || '-';
        tr.appendChild(tdCurso);

        const saldo = Number(st.score ?? 0);
        const tdSaldo = document.createElement('td');
        tdSaldo.innerHTML = `<span style="color: var(--success-color); font-weight: 600;">${saldo}</span>`;
        tr.appendChild(tdSaldo);

        const tdAcoes = document.createElement('td');
        const a = document.createElement('a');
        a.href = `enviar.html?aluno=${st.id}`;
        a.className = 'btn btn-primary';
        a.style.cssText = 'padding: 0.5rem 1rem; font-size: 0.875rem;';
        a.textContent = 'Enviar Moedas';
        tdAcoes.appendChild(a);
        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Erro ao carregar lista de alunos:', err);
    }
  })();
});

