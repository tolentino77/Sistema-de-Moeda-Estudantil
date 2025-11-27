// extrato.js
const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const transactionsContainer = document.getElementById('transactionsContainer');
  const transactionsBody = document.getElementById('transactionsBody');
  const noTransactions = document.getElementById('noTransactions');
  const balanceAmount = document.getElementById('balanceAmount');
  const logoutLink = document.getElementById('logoutLink');

  // Logout
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('studentId');
      localStorage.removeItem('authToken');
      localStorage.removeItem('studentName');
      localStorage.removeItem('studentEmail');
    } catch (err) {
      console.warn('Erro ao limpar localStorage no logout:', err);
    }
    window.location.href = '../index.html';
  });

  // Helper de requisição com token
  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem('authToken');
    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    return res;
  }

  // Formata data no padrão brasileiro
  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    });
  }

  // Carrega saldo e extrato
  async function loadStudentAndExchanges(studentId) {
    try {
      loadingEl.style.display = 'block';
      errorEl.style.display = 'none';
      transactionsContainer.style.display = 'none';
      noTransactions.style.display = 'none';

      // 1️⃣ Buscar saldo do aluno
      const studentResp = await fetchJson(`${API_BASE}students/student/${studentId}`);
      if (!studentResp.ok) throw new Error('Erro ao buscar dados do aluno.');
      const student = await studentResp.json();
      const saldo = student.score != null ? student.score : 0;
      balanceAmount.textContent = `${saldo.toLocaleString('pt-BR')} moedas`;

      // 2️⃣ Buscar trocas (extrato)
      const exchangesResp = await fetchJson(`${API_BASE}exchanges/student/${studentId}`);
      if (!exchangesResp.ok) {
        if (exchangesResp.status === 404) {
          loadingEl.style.display = 'none';
          noTransactions.style.display = 'block';
          return;
        }
        throw new Error('Erro ao carregar trocas.');
      }

      const exchanges = await exchangesResp.json();
      loadingEl.style.display = 'none';

      if (!Array.isArray(exchanges) || exchanges.length === 0) {
        noTransactions.style.display = 'block';
        return;
      }

      // 3️⃣ Montar tabela
      transactionsBody.innerHTML = '';
      exchanges
        .sort((a, b) => new Date(b.exchangeDate) - new Date(a.exchangeDate))
        .forEach((ex) => {
          const tr = document.createElement('tr');

          // Data
          const tdDate = document.createElement('td');
          tdDate.textContent = formatDate(ex.exchangeDate);
          tr.appendChild(tdDate);

          // Vantagem
          const tdAdvantage = document.createElement('td');
          tdAdvantage.textContent = ex.advantageName || '—';
          tr.appendChild(tdAdvantage);

          // Descrição
          const tdDesc = document.createElement('td');
          tdDesc.textContent = ex.description || '—';
          tr.appendChild(tdDesc);

          // Valor
          const tdValue = document.createElement('td');
          tdValue.textContent = `${ex.coinValue} `;
          tdValue.style.color = 'var(--danger-color)';
          tdValue.style.fontWeight = 'bold';
          tr.appendChild(tdValue);

          // Status
          const tdStatus = document.createElement('td');
          tdStatus.textContent = ex.status || '—';
          tdStatus.style.color =
            ex.status === 'COMPLETED'
              ? 'var(--success-color)'
              : ex.status === 'PENDING'
              ? 'var(--warning-color)'
              : 'inherit';
          tr.appendChild(tdStatus);

          // Código de Resgate
          const tdCode = document.createElement('td');
          tdCode.textContent = ex.redemptionCode || '—';
          tr.appendChild(tdCode);

          transactionsBody.appendChild(tr);
        });

      transactionsContainer.style.display = 'block';
    } catch (err) {
      console.error('Erro ao carregar extrato:', err);
      loadingEl.style.display = 'none';
      errorEl.textContent = 'Erro ao carregar o extrato. Tente novamente.';
      errorEl.style.display = 'block';
    }
  }

  // Inicialização
  const studentId = localStorage.getItem('studentId');
  if (!studentId) {
    window.location.href = '../login.html';
    return;
  }

  loadStudentAndExchanges(studentId);
});
