// professor-cadastro.js
// Cadastro de Professor via API seguindo a lógica do front de estudantes

const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerProfessorForm');
  if (!form) return;

  const messageEl = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');

  function showMessage(text, type = 'error') {
    if (!messageEl) return;
    messageEl.style.display = 'block';
    messageEl.textContent = text;
    messageEl.style.color = type === 'error' ? '#b00020' : 'var(--success-color, #0b8457)';
  }

  function clearMessage() {
    if (!messageEl) return;
    messageEl.style.display = 'none';
    messageEl.textContent = '';
  }

  function setLoading(loading) {
    if (submitBtn) {
      submitBtn.disabled = loading;
      submitBtn.style.opacity = loading ? '0.7' : '';
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    const nome = document.getElementById('nome')?.value?.trim();
    const email = document.getElementById('email')?.value?.trim();
    const senha = document.getElementById('senha')?.value;
    const cpfRaw = document.getElementById('cpf')?.value?.trim();
    const departamento = document.getElementById('departamento')?.value?.trim();
    const instituicaoId = document.getElementById('instituicao')?.value;

    if (!nome || !email || !senha || !cpfRaw || !departamento || !instituicaoId) {
      showMessage('Por favor preencha todos os campos obrigatórios.', 'error');
      return;
    }

    const cpf = (cpfRaw || '').replace(/\D/g, '');

    const payload = {
      name: nome,
      email: email,
      password: senha,
      socialId: cpf,
      department: departamento,
      institutionId: Number(instituicaoId)
    };

    try {
      setLoading(true);
      const url = `${API_BASE}professors/professor`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const raw = await resp.text();
      let data = null;
      try { data = JSON.parse(raw); } catch (_) { data = raw; }

      if (resp.status === 201 || resp.status === 200) {
        // opcional: salvar id / token se backend retornar
        const profId = data?.id || data?.professorId;
        const token = data?.token || data?.accessToken;
        if (profId) localStorage.setItem('professorId', String(profId));
        if (token) localStorage.setItem('authToken', token);

        showMessage('Cadastro realizado com sucesso! Redirecionando para login...', 'success');
        const loginUrl = `../login/login-professor.html?registered=1&email=${encodeURIComponent(email)}`;
        setTimeout(() => window.location.href = loginUrl, 1200);
        return;
      }

      if (data && typeof data === 'object') {
        if (data.message) return showMessage(String(data.message), 'error');
        if (data.errors) {
          const msgs = Array.isArray(data.errors) ? data.errors.join(' | ') : JSON.stringify(data.errors);
          return showMessage(msgs, 'error');
        }
        const collected = [];
        for (const k in data) {
          if (Array.isArray(data[k])) collected.push(`${k}: ${data[k].join(', ')}`);
          else if (typeof data[k] === 'string') collected.push(`${k}: ${data[k]}`);
        }
        if (collected.length) return showMessage(collected.join(' · '), 'error');
      }

      showMessage(`Erro ao cadastrar. ${resp.status} - ${raw}`, 'error');
    } catch (err) {
      console.error('Erro no cadastro do professor:', err);
      showMessage('Erro ao conectar com o servidor. Tente novamente mais tarde.', 'error');
    } finally {
      setLoading(false);
    }
  });
});

