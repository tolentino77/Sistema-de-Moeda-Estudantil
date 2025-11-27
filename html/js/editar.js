// editar.js
const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const successEl = document.getElementById('success');
  const editForm = document.getElementById('editForm');
  const logoutLink = document.getElementById('logoutLink');
  const deleteBtn = document.getElementById('deleteAccountBtn');

  const studentId = localStorage.getItem('studentId');
  if (!studentId) {
    window.location.href = '../login.html';
    return;
  }

  // Logout
  logoutLink && logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    try { localStorage.clear(); } catch (err) { console.warn(err); }
    window.location.href = '../index.html';
  });

  function showError(msg) {
    errorEl.style.display = 'block';
    successEl.style.display = 'none';
    errorEl.textContent = msg;
  }

  function showSuccess(msg) {
    successEl.style.display = 'block';
    errorEl.style.display = 'none';
    successEl.textContent = msg;
  }

  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem('authToken');
    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, Object.assign({}, opts, { headers }));
    return res;
  }

  // Preenche os campos com o GET /students/student/{id}
  async function loadProfile() {
    try {
      loadingEl.style.display = 'block';
      errorEl.style.display = 'none';
      successEl.style.display = 'none';
      editForm.style.display = 'none';

      const resp = await fetchJson(`${API_BASE}students/student/${encodeURIComponent(studentId)}`);
      if (!resp.ok) {
        if (resp.status === 401) {
          showError('Sessão expirada. Faça login novamente.');
          setTimeout(() => window.location.href = '../login.html', 1400);
          return;
        }
        const txt = await resp.text();
        showError(`Erro ao carregar perfil: ${resp.status} ${txt}`);
        return;
      }

      const data = await resp.json();

      // Mapear os campos conforme a sua documentação (ajuste se necessário)
      document.getElementById('name').value = data.name || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('socialId').value = data.socialId || data.cpf || data.document || '';
      document.getElementById('document').value = data.document || '';
      document.getElementById('course').value = data.course || '';
      // institutionId pode vir como number ou institutionId/institution
      const instId = (data.institutionId != null) ? data.institutionId : (data.institutionId || data.institution || data.institutionId);
      if (instId) {
        // tenta selecionar a option correspondente
        const sel = document.getElementById('institutionId');
        if (sel) {
          for (let i = 0; i < sel.options.length; i++) {
            if (String(sel.options[i].value) === String(instId)) {
              sel.selectedIndex = i;
              break;
            }
          }
        }
      }

      document.getElementById('address').value = data.address || '';

      loadingEl.style.display = 'none';
      editForm.style.display = 'block';
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
      showError('Erro de conexão ao carregar perfil. Verifique sua rede.');
    }
  }

  loadProfile();

  // Envio do PUT
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';
    successEl.style.display = 'none';

    // Construir body no formato exato da documentação
    const body = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      socialId: document.getElementById('socialId').value.trim(),
      document: document.getElementById('document').value.trim(),
      address: document.getElementById('address').value.trim(),
      course: document.getElementById('course').value.trim()
    };

    const passwordVal = document.getElementById('password').value;
    if (passwordVal && passwordVal.trim() !== '') {
      body.password = passwordVal;
    }

    // institutionId deve ser número
    const instEl = document.getElementById('institutionId');
    const instValue = instEl ? instEl.value : '';
    if (!instValue) {
      showError('Selecione a instituição (institutionId).');
      return;
    }
    // converter para número
    const instNum = Number(instValue);
    if (Number.isNaN(instNum)) {
      showError('institutionId inválido. Deve ser um número.');
      return;
    }
    body.institutionId = instNum;

    // Envia o PUT
    try {
      const resp = await fetchJson(`${API_BASE}students/student/${encodeURIComponent(studentId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (resp.ok) {
        const respData = await resp.json().catch(() => null);
        showSuccess('Perfil atualizado com sucesso!');
        // Atualiza localStorage se necessário (ex.: nome/email)
        try {
          if (body.name) localStorage.setItem('studentName', body.name);
          if (body.email) localStorage.setItem('studentEmail', body.email);
        } catch (err) { /* ignore */ }

        // redirecionar de leve após 1.2s
        setTimeout(() => { window.location.href = 'perfil.html'; }, 1200);
        return;
      }

      // Se não ok, tenta decodificar resposta para mostrar razão do 400
      const contentType = resp.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        const errJson = await resp.json();
        // tenta extrair mensagem comum
        const serverMsg = errJson.message || errJson.error || JSON.stringify(errJson);
        showError(`Erro ${resp.status}: ${serverMsg}`);
      } else {
        const txt = await resp.text();
        showError(`Erro ${resp.status}: ${txt}`);
      }
    } catch (err) {
      console.error('Erro ao enviar PUT:', err);
      showError('Erro de rede ao tentar salvar. Verifique sua conexão.');
    }
  });

  // DELETE account
  deleteBtn.addEventListener('click', async () => {
    if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) return;

    try {
      const resp = await fetchJson(`${API_BASE}students/student/${encodeURIComponent(studentId)}`, {
        method: 'DELETE'
      });

      if (resp.ok) {
        try { localStorage.clear(); } catch (err) { /* ignore */ }
        alert('Conta excluída com sucesso.');
        window.location.href = '../index.html';
        return;
      }

      const ct = resp.headers.get('Content-Type') || '';
      if (ct.includes('application/json')) {
        const j = await resp.json();
        showError(`Erro ao excluir: ${j.message || JSON.stringify(j)}`);
      } else {
        const t = await resp.text();
        showError(`Erro ao excluir: ${t}`);
      }
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      showError('Erro de rede ao tentar excluir conta.');
    }
  });
});
