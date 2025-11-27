// cadastro.js
// Faz o POST para criar um aluno usando a base API:
// https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/
// Endpoint esperado: POST /students/student
// Observação: bom mapear os campos conforme a sua API. Abaixo envio os campos mais prováveis:
// { name, email, password, socialId, document, address, course, institutionId }

const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const messageEl = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');

  function showMessage(text, type = 'error') {
    messageEl.style.display = 'block';
    messageEl.textContent = text;
    if (type === 'error') {
      messageEl.style.color = '#b00020';
      messageEl.style.background = 'transparent';
    } else {
      messageEl.style.color = 'var(--success-color, #0b8457)';
      messageEl.style.background = 'transparent';
    }
  }
  function clearMessage() {
    messageEl.style.display = 'none';
    messageEl.textContent = '';
  }
  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.style.opacity = loading ? '0.7' : '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    // coleta valores
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value.trim();
    const rg = document.getElementById('rg').value.trim();
    const curso = document.getElementById('curso').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const instituicaoId = document.getElementById('instituicao').value;

    // validações simples no cliente
    if (!nome || !email || !senha || !cpf || !rg || !curso || !endereco || !instituicaoId) {
      showMessage('Por favor preencha todos os campos obrigatórios.', 'error');
      return;
    }

    // monta payload mapeando para os campos esperados pelo backend
    const payload = {
      name: nome,
      email: email,
      password: senha,
      socialId: cpf.replace(/\D/g, ''),   // CPF sem pontuação (ajuste se necessário)
      document: rg,
      address: endereco,
      course: curso,
      institutionId: Number(instituicaoId)
    };

    try {
      setLoading(true);
      const url = `${API_BASE}students/student`;
      console.log("Payload enviado:", payload);

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
        });


      const textOrJson = await resp.text();
      let data = null;
      try { data = JSON.parse(textOrJson); } catch (err) { data = textOrJson; }

      if (resp.status === 201 || resp.status === 200) {
        // sucesso
        // tenta extrair id e token se forem retornados
        let userId = null;
        let token = null;
        if (data && typeof data === 'object') {
          userId = data.id || data.studentId || data.userId || (data.student && data.student.id);
          token = data.token || data.accessToken || data.authToken;
        }

        // se backend retornou token/id, você pode salvar no localStorage (opcional)
        if (userId) localStorage.setItem('studentId', String(userId));
        if (token) localStorage.setItem('authToken', token);

        showMessage('Cadastro realizado com sucesso! Redirecionando para login...', 'success');

        // redireciona para página de login (pode passar email para facilitar)
        const loginUrl = `../login/index.html?registered=1&email=${encodeURIComponent(email)}`;
        setTimeout(() => window.location.href = loginUrl, 1200);
        return;
      }

      // tratamento de erros
      // se retorno for objeto com mensagens de validação, tenta exibir
      if (data && typeof data === 'object') {
        // procura por mensagens comuns
        if (data.message) {
          showMessage(String(data.message), 'error');
          return;
        }
        if (data.errors) {
          const msgs = Array.isArray(data.errors) ? data.errors.join(' | ') : JSON.stringify(data.errors);
          showMessage(msgs, 'error');
          return;
        }
        // às vezes vem { field: ["err", ...] }
        const collected = [];
        for (const k in data) {
          if (Array.isArray(data[k])) collected.push(`${k}: ${data[k].join(', ')}`);
          else if (typeof data[k] === 'string') collected.push(`${k}: ${data[k]}`);
        }
        if (collected.length) {
          showMessage(collected.join(' · '), 'error');
          return;
        }
      }

      // fallback: mostra o texto retornado pela API
      showMessage(`Erro ao cadastrar. ${resp.status} - ${textOrJson}`, 'error');
    } catch (err) {
      console.error('Erro no cadastro:', err);
      showMessage('Erro ao conectar com o servidor. Tente novamente mais tarde.', 'error');
    } finally {
      setLoading(false);
    }
  });
});