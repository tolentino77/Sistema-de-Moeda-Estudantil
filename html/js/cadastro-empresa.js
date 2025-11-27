// cadastro-empresa.js
// POST para criar empresa no endpoint correto esperado pela API:
// POST https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/companies/company

const API_BASE = 'https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerCompanyForm');
  const messageEl = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');

  function showMessage(text, type = 'error') {
    messageEl.style.display = 'block';
    messageEl.textContent = text;
    messageEl.style.color = type === 'error' ? '#b00020' : 'var(--success-color, #0b8457)';
    messageEl.style.background = 'transparent';
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

    // pega os valores
    const nomeFantasia = document.getElementById('nomeFantasia').value.trim();
    const razaoSocial = document.getElementById('razaoSocial').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!nomeFantasia || !razaoSocial || !cnpj || !email || !senha) {
      showMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // 📌 payload EXATO do DTO CompanyRequestDTO
    const payload = {
      companyNickname: nomeFantasia,
      companyName: razaoSocial,
      companyDocument: cnpj.replace(/\D/g, ''), // remove máscara
      email: email,
      password: senha
    };

    try {
      setLoading(true);

      const resp = await fetch(API_BASE + 'companies/company', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const raw = await resp.text();
      let data = null;
      try { data = JSON.parse(raw); } catch (e) { data = raw; }

      // Sucesso (201 ou 200)
      if (resp.status === 201 || resp.ok) {
        showMessage("Empresa cadastrada com sucesso! Redirecionando...", "success");

        const loginUrl = `../login/login-empresa.html?registeredCompany=1&email=${encodeURIComponent(email)}`;
        setTimeout(() => window.location.href = loginUrl, 1200);
        return;
      }

      // erros estruturados
      if (data && typeof data === "object") {
        if (data.message) {
          showMessage(data.message);
          return;
        }
        if (data.errors) {
          const messages = Array.isArray(data.errors) ? data.errors.join(' | ') : JSON.stringify(data.errors);
          showMessage(messages);
          return;
        }
      }

      // fallback
      showMessage(`Erro ao cadastrar empresa. ${resp.status} - ${raw}`);

    } catch (err) {
      console.error("Erro:", err);
      showMessage("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  });
});
