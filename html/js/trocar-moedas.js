// trocar-moedas.js
const API_BASE = "https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/";

document.addEventListener("DOMContentLoaded", () => {
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const advantagesContainer = document.getElementById("advantagesContainer");
  const noAdvantagesEl = document.getElementById("noAdvantages");
  const balanceAmount = document.getElementById("balanceAmount");
  const logoutLink = document.getElementById("logoutLink");

  const DEFAULT_IMAGE = "../assets/img/default-advantage.png";

  // Logout
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../index.html";
  });

  // ============ FETCH COM TOKEN ============
  async function fetchJson(url, opts = {}) {
    const token = localStorage.getItem("authToken");
    const headers = { ...opts.headers };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return fetch(url, { ...opts, headers });
  }

  // ============ SALDO ============
  async function loadStudentData(studentId) {
    try {
      const url = `${API_BASE}students/student/${studentId}`;
      const resp = await fetchJson(url);
      if (!resp.ok) throw new Error();

      const data = await resp.json();
      balanceAmount.textContent = `${data.score ?? 0} moedas`;
      return data.score ?? 0;

    } catch (err) {
      errorEl.textContent = "Erro ao carregar dados do aluno.";
      errorEl.style.display = "block";
      return 0;
    }
  }

  // ============ VANTAGENS ============
  async function loadAdvantages(studentBalance) {
    try {
      const resp = await fetchJson(`${API_BASE}advantages/all`);
      if (!resp.ok) throw new Error();

      const advantages = await resp.json();

      loadingEl.style.display = "none";
      advantagesContainer.style.display = "grid";
      advantagesContainer.innerHTML = "";

      if (!advantages.length) {
        noAdvantagesEl.style.display = "block";
        return;
      }

      advantages.forEach((adv) => {
        const card = document.createElement("div");
        card.classList.add("advantage-card");

        // 🌟 IMAGEM
        const img = document.createElement("img");
        img.src = adv.photoUrl && adv.photoUrl.length > 5 ? adv.photoUrl : DEFAULT_IMAGE;

        img.onerror = () => img.src = DEFAULT_IMAGE;

        // TÍTULO
        const title = document.createElement("h3");
        title.textContent = adv.name;

        // DESCRIÇÃO (TRUNCADA)
        const desc = document.createElement("p");
        desc.classList.add("truncate");
        desc.textContent = adv.description;

        // EMPRESA
        const company = document.createElement("p");
        company.textContent = `Empresa: ${adv.companyName}`;

        // PREÇO
        const price = document.createElement("div");
        price.classList.add("price");
        price.textContent = `${adv.coinCost} moedas`;

        // BOTÃO
        const button = document.createElement("button");
        button.style.width = "100%";

        if (adv.quantity === 0) {
          button.textContent = "Indisponível";
          button.disabled = true;

        } else if (studentBalance >= adv.coinCost) {
          button.textContent = "Trocar";
          button.addEventListener("click", () => trocarVantagem(adv));

        } else {
          button.textContent = "Saldo insuficiente";
          button.disabled = true;
        }

        card.append(img, title, desc, company, price, button);
        advantagesContainer.appendChild(card);
      });

    } catch (err) {
      errorEl.textContent = "Erro ao carregar vantagens.";
      errorEl.style.display = "block";
    }
  }

  // ============ TROCA ============
  async function trocarVantagem(vantagem) {
    const studentId = localStorage.getItem("studentId");
    const studentName = localStorage.getItem("studentName");
    const studentEmail = localStorage.getItem("studentEmail");

    if (!confirm(`Deseja trocar ${vantagem.coinCost} moedas por "${vantagem.name}"?`)) return;

    try {
      const resp = await fetchJson(`${API_BASE}exchanges/exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, advantageId: vantagem.id }),
      });

      if (!resp.ok) throw new Error();

      alert("Troca realizada com sucesso!");

      await fetch(`${API_BASE}emails/send-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: studentEmail,
          name: studentName,
          product: vantagem.name,
        }),
      });

      alert("Um e-mail de confirmação foi enviado.");
      location.reload();

    } catch (err) {
      alert("Erro ao realizar troca.");
    }
  }

  // ============ INIT ============
  async function init() {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) return (window.location.href = "../login.html");

    loadingEl.style.display = "block";

    const saldo = await loadStudentData(studentId);
    await loadAdvantages(saldo);

    loadingEl.style.display = "none";
  }

  init();
});
