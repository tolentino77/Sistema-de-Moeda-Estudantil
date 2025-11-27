const API = "https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/";

document.addEventListener("DOMContentLoaded", () => {
  const empresaId = localStorage.getItem("empresaId");

  if (!empresaId) {
    alert("Erro: empresa não logada.");
    window.location.href = "../index.html";
    return;
  }

  carregarPerfil(empresaId);
  carregarEstatisticas(empresaId);
});

// ========================= CARREGAR PERFIL ==============================
async function carregarPerfil(id) {
  try {
    const response = await fetch(`${API}companies/company/${id}`);

    if (!response.ok) throw new Error("Erro ao buscar dados.");

    const empresa = await response.json();

    document.getElementById("empresaName").textContent = empresa.companyName;
    document.getElementById("empresaEmail").textContent = empresa.email;
    document.getElementById("empresaSocial").textContent = empresa.companyNickname ?? "Não informado";
    document.getElementById("empresaCnpj").textContent = empresa.companyDocument ?? "Não informado";

    // Avatar automático
    const initials = empresa.companyName
      .split(" ")
      .map(p => p[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    document.getElementById("avatar").textContent = initials;

  } catch (err) {
    console.error(err);
  }
}

// ========================= CARREGAR ESTATÍSTICAS ==============================
async function carregarEstatisticas(id) {
  try {
    // VANTAGENS
    const v = await fetch(`${API}advantages/company/${id}`);
    const vantagens = v.ok ? await v.json() : [];
    document.getElementById("statsVantagens").textContent = vantagens.length;

    // RESGATES
    const r = await fetch(`${API}redemptions/company/${id}`);
    const resgates = r.ok ? await r.json() : [];
    document.getElementById("statsResgates").textContent = resgates.length;

    // AVALIAÇÃO (se existir rota)
    const ratingResp = await fetch(`${API}companies/rating/${id}`);
    let rating = 0;

    if (ratingResp.ok) {
      rating = await ratingResp.json();
    }

    document.getElementById("statsRating").textContent = Number(rating).toFixed(1);

  } catch (err) {
    console.error("Erro ao carregar estatísticas:", err);
  }
}
