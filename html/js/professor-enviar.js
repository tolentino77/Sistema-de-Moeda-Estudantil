// professor-enviar.js
// Envia moedas para alunos via /transactions/transaction e preenche lista de alunos

const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const professorId = localStorage.getItem('professorId');
  if (!professorId) {
    window.location.href = '../login/login-professor.html';
    return;
  }

  const sel = (s) => document.querySelector(s);
  const balanceEl = sel('.balance-display .balance-amount');
  const form = document.querySelector('form');
  const alunoSelect = document.getElementById('aluno');
  const valorInput = document.getElementById('valor');
  const msgTextarea = document.getElementById('mensagem');

  // Cria um elemento de mensagem (sucesso/erro) abaixo do formulário
  const msgBox = document.createElement('div');
  msgBox.style.display = 'none';
  msgBox.style.marginTop = '0.75rem';
  form?.appendChild(msgBox);

  function showMessage(text, type = 'error') {
    msgBox.style.display = 'block';
    msgBox.textContent = text;
    msgBox.style.color = type === 'error' ? '#b00020' : 'var(--success-color, #0b8457)';
  }

  function clearMessage() {
    msgBox.style.display = 'none';
    msgBox.textContent = '';
  }

  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem('authToken');
    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    return res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
  }

  // Preenche saldo e alunos da instituição do professor
  (async () => {
    try {
      const [prof, saldo] = await Promise.all([
        fetchJson(`${API_BASE}professors/professor/${professorId}`),
        fetchJson(`${API_BASE}professors/professor/${professorId}/balance`).catch(() => 0)
      ]);
      if (balanceEl) balanceEl.textContent = String(Number(saldo ?? prof?.score ?? 0));

      const instId = prof?.institutionId;
      if (instId) {
        const students = await fetchJson(`${API_BASE}students/institution/${instId}`).catch(() => []);
        if (Array.isArray(students) && alunoSelect) {
          // Limpa e adiciona opções reais
          alunoSelect.innerHTML = '<option value="">Escolha um aluno</option>';
          students.forEach((st) => {
            const opt = document.createElement('option');
            opt.value = String(st.id);
            opt.textContent = `${st.name || 'Aluno'}${st.course ? ' - ' + st.course : ''}`;
            alunoSelect.appendChild(opt);
          });
        }
      }

      // Pré-seleciona aluno via query string ?aluno={id}
      const params = new URLSearchParams(window.location.search);
      const alunoIdQS = params.get('aluno');
      if (alunoIdQS && alunoSelect) alunoSelect.value = alunoIdQS;
    } catch (err) {
      console.error('Erro ao preparar página de envio:', err);
    }
  })();

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    const studentId = alunoSelect?.value;
    const coinValue = Number(valorInput?.value || 0);
    const message = msgTextarea?.value?.trim();

    if (!studentId || !coinValue || !message) {
      showMessage('Preencha aluno, quantidade e mensagem.', 'error');
      return;
    }

    const payload = {
      studentId: Number(studentId),
      professorId: Number(professorId),
      coinValue,
      message
    };

    try {
      const resp = await fetch(`${API_BASE}transactions/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const raw = await resp.text();
      let data = null;
      try { data = JSON.parse(raw); } catch (_) { data = raw; }

      if (resp.status === 201 || resp.status === 200) {
        showMessage('Moedas enviadas com sucesso!', 'success');
        // Atualiza saldo exibido
        try {
          const saldo = await fetchJson(`${API_BASE}professors/professor/${professorId}/balance`).catch(() => null);
          if (saldo != null && balanceEl) balanceEl.textContent = String(saldo);
        } catch {}
        // Limpa campos
        valorInput.value = '';
        msgTextarea.value = '';
        return;
      }

      if (data && typeof data === 'object' && data.message) {
        showMessage(String(data.message), 'error');
      } else {
        showMessage(`Erro ao enviar moedas. ${resp.status} - ${raw}`, 'error');
      }
    } catch (err) {
      console.error('Erro ao enviar moedas:', err);
      showMessage('Erro ao conectar com o servidor.', 'error');
    }
  });
});

