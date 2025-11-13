// trocar-moedas.js
const API_BASE = 'https://sistema-de-moeda-estudantil-2.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const advantagesContainer = document.getElementById('advantagesContainer');
  const noAdvantagesEl = document.getElementById('noAdvantages');
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
        // ou localStorage.clear(); se quiser limpar tudo
        } catch (err) {
        console.warn('Erro ao limpar localStorage no logout:', err);
        }
        window.location.href = '../index.html';
    });


  // Função auxiliar para requisições com token
  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem('authToken');
    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    return res;
  }

  // Carrega dados do aluno (para mostrar o saldo)
  async function loadStudentData(studentId) {
    try {
      const url = `${API_BASE}students/student/${encodeURIComponent(studentId)}`;
      const resp = await fetchJson(url);
      if (!resp.ok) throw new Error('Erro ao buscar dados do aluno');

      const data = await resp.json();
      const saldo = data.score != null ? data.score : 0;
      balanceAmount.textContent = `${saldo.toLocaleString('pt-BR')} moedas`;
      return saldo;
    } catch (err) {
      console.error('Erro ao carregar dados do aluno:', err);
      errorEl.textContent = 'Erro ao carregar dados do aluno.';
      errorEl.style.display = 'block';
      return 0;
    }
  }

  // Cria e renderiza os cards das vantagens
  async function loadAdvantages(studentBalance) {
    try {
      const resp = await fetchJson(`${API_BASE}advantages/all`);
      if (!resp.ok) throw new Error('Erro ao buscar vantagens');
      const advantages = await resp.json();

      loadingEl.style.display = 'none';
      advantagesContainer.style.display = 'grid';
      advantagesContainer.innerHTML = '';

      if (!advantages || advantages.length === 0) {
        noAdvantagesEl.style.display = 'block';
        return;
      }

      advantages.forEach((adv) => {
        const card = document.createElement('div');
        card.classList.add('card', 'advantage-card');
        card.style.textAlign = 'center';
        card.style.padding = '1rem';

        // Imagem
        const img = document.createElement('img');
        img.src = adv.photoUrl || '../assets/default-advantage.png';
        img.alt = adv.name;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';
        img.style.marginBottom = '0.5rem';

        // Título
        const title = document.createElement('h3');
        title.textContent = adv.name;
        title.style.marginBottom = '0.5rem';
        title.style.color = 'var(--text-primary)';

        // Descrição
        const desc = document.createElement('p');
        desc.textContent = adv.description || '—';
        desc.style.fontSize = '0.9rem';
        desc.style.color = 'var(--text-secondary)';
        desc.style.marginBottom = '0.5rem';

        // Empresa
        const company = document.createElement('p');
        company.textContent = `Empresa: ${adv.companyName || '—'}`;
        company.style.fontSize = '0.85rem';
        company.style.color = 'var(--text-secondary)';
        company.style.marginBottom = '0.5rem';

        // Preço
        const price = document.createElement('div');
        price.textContent = `${adv.coinCost} moedas`;
        price.style.fontWeight = 'bold';
        price.style.color = 'var(--accent-color)';
        price.style.marginBottom = '0.75rem';

        // Botão
        // Botão
    const button = document.createElement('button');
    button.classList.add('button');
    button.style.width = '100%';
    button.style.maxWidth = '180px';
    button.style.margin = '0 auto';

    // Verifica disponibilidade da vantagem
    if (adv.quantity === 0) {
    button.textContent = 'Indisponível';
    button.disabled = true;
    button.style.backgroundColor = '#aaa';
    button.style.cursor = 'not-allowed';
    card.style.opacity = '0.7'; // visual mais apagado
    } else if (studentBalance >= adv.coinCost) {
    button.textContent = 'Trocar';
    button.addEventListener('click', () => trocarVantagem(adv));
    } else {
    button.textContent = 'Saldo insuficiente';
    button.disabled = true;
    button.classList.add('button-disabled');
    }


        card.append(img, title, desc, company, price, button);
        advantagesContainer.appendChild(card);
      });
    } catch (err) {
      console.error('Erro ao carregar vantagens:', err);
      errorEl.textContent = 'Erro ao carregar vantagens.';
      errorEl.style.display = 'block';
    }
  }

  // Função de troca de vantagem
  async function trocarVantagem(vantagem) {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      alert('Sessão expirada. Faça login novamente.');
      window.location.href = '../login.html';
      return;
    }

    if (!confirm(`Deseja trocar ${vantagem.coinCost} moedas por "${vantagem.name}"?`)) return;

    try {
      const resp = await fetchJson(`${API_BASE}exchanges/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, advantageId: vantagem.id }),
      });

      if (!resp.ok) throw new Error('Erro ao processar troca.');

      alert('Troca realizada com sucesso!');
      location.reload();
    } catch (err) {
      console.error('Erro ao realizar troca:', err);
      alert('Erro ao realizar troca. Tente novamente.');
    }
  }

  // Inicialização
  async function init() {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      window.location.href = '../login.html';
      return;
    }

    loadingEl.style.display = 'block';
    const saldo = await loadStudentData(studentId);
    await loadAdvantages(saldo);
    loadingEl.style.display = 'none';
  }

  init();
});
