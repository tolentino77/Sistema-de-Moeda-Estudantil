// professor-extrato.js
// Lista transações feitas pelo professor e mostra saldo/estatísticas

const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const professorId = localStorage.getItem('professorId');
  if (!professorId) {
    window.location.href = '../login/login-professor.html';
    return;
  }

  const sel = (s) => document.querySelector(s);
  const balanceEl = sel('.balance-display .balance-amount');
  const hintEl = sel('.balance-display p');
  const tbody = sel('.table-container tbody') || sel('table tbody');

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d)) return String(dateStr || '');
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
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
      const [balance, totalSent, txsRaw] = await Promise.all([
        fetchJson(`${API_BASE}professors/professor/${professorId}/balance`).catch(() => 0),
        fetchJson(`${API_BASE}transactions/professor/${professorId}/total`).catch(() => 0),
        fetchJson(`${API_BASE}transactions/professor/${professorId}`).catch(() => [])
      ]);

      const txs = Array.isArray(txsRaw) ? txsRaw.slice() : [];
      const saldo = Number(balance || 0);
      const total = Number(totalSent || 0);
      const inicial = saldo + total;

      if (balanceEl) balanceEl.textContent = String(saldo);
      if (hintEl) hintEl.textContent = `${total} moedas distribuídas de ${inicial} iniciais`;

      if (tbody) tbody.innerHTML = '';

      // Ordena por data crescente para calcular saldo restante após cada transação
      txs.sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate));
      let corrente = inicial;
      txs.forEach((t) => {
        corrente -= Number(t.coinValue || 0);
        const tr = document.createElement('tr');

        const tdDate = document.createElement('td');
        tdDate.textContent = formatDate(t.transactionDate);
        tr.appendChild(tdDate);

        const tdAluno = document.createElement('td');
        tdAluno.textContent = t.studentName || '-';
        tr.appendChild(tdAluno);

        const tdMsg = document.createElement('td');
        tdMsg.textContent = t.message || '-';
        tr.appendChild(tdMsg);

        const tdValue = document.createElement('td');
        tdValue.textContent = `-${Number(t.coinValue || 0)}`;
        tdValue.style.color = 'var(--danger-color)';
        tdValue.style.fontWeight = '600';
        tr.appendChild(tdValue);

        const tdSaldo = document.createElement('td');
        tdSaldo.textContent = String(corrente);
        tr.appendChild(tdSaldo);

        if (tbody) tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Erro ao carregar extrato do professor:', err);
    }
  })();
});

