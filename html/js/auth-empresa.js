// auth-professor.js — login simplificado por e-mail
const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('errorMessage');

  function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
  }

  function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const email = emailInput.value.trim();

    if (!email) {
      showError('Informe seu e-mail.');
      return;
    }

    try {
      // Busca o professor pelo e-mail na API
      const resp = await fetch(`${API_BASE}companies/email/${email}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (resp.status === 404) {
        showError('empresa não encontrado.');
        return;
      }

      if (!resp.ok) {
        showError('Erro ao buscar a empresa. Tente novamente mais tarde.');
        return;
      }

      const data = await resp.json();
      const empresa = Array.isArray(data) ? data[0] : data;

      if (!empresa || !empresa.id) {
        showError('empresa não encontrado ou resposta inválida.');
        return;
      }

      // Salva dados do professor no localStorage
      localStorage.setItem('empresaId', String(empresa.id));
      localStorage.setItem('empresaName', empresa.name || '');
      localStorage.setItem('empresaEmail', empresa.email || '');

      // Redireciona para o extrato do professor
      window.location.href = '../empresa/perfil.html';
    } catch (err) {
      console.error('Erro no login da empresa:', err);
      showError('Erro ao conectar com o servidor.');
    }
  });
});
