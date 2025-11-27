// auth-student.js — login simplificado apenas por email
const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('errorMessage');

  // Funções auxiliares
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
      // Chama a API pelo e-mail
      const resp = await fetch(`${API_BASE}students/email/${email}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (resp.status === 404) {
        showError('Usuário não encontrado.');
        return;
      }

      if (!resp.ok) {
        showError('Erro ao buscar usuário. Tente novamente mais tarde.');
        return;
      }

      const data = await resp.json();
      const student = Array.isArray(data) ? data[0] : data;

      if (!student || !student.id) {
        showError('Usuário não encontrado ou resposta inválida.');
        return;
      }

      // Salva ID do estudante para uso nas próximas páginas
      localStorage.setItem('studentId', String(student.id));

      // (Opcional) salva também o nome ou e-mail
      localStorage.setItem('studentName', student.name || '');
      localStorage.setItem('studentEmail', student.email || '');

      // Redireciona para extrato
      window.location.href = '../aluno/extrato.html';
    } catch (err) {
      console.error('Erro no login simplificado:', err);
      showError('Erro ao conectar com o servidor.');
    }
  });
});
