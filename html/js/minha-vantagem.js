const API = "https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/";

document.addEventListener("DOMContentLoaded", () => {
  const empresaId = localStorage.getItem("empresaId");

  if (!empresaId) {
    alert("Erro: empresa não logada.");
    window.location.href = "../index.html";
    return;
  }

  carregarVantagens(empresaId);
});

// ========================= CARREGAR LISTA DE VANTAGENS ==========================
async function carregarVantagens(id) {
  try {
    const response = await fetch(`${API}advantages/company/${id}`);

    if (!response.ok) throw new Error("Erro ao buscar vantagens.");

    const vantagens = await response.json();
    const tbody = document.getElementById("vantagensList");
    tbody.innerHTML = "";

    if (vantagens.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:1rem;">
            Nenhuma vantagem cadastrada.
          </td>
        </tr>`;
      return;
    }

    vantagens.forEach(v => {
      const status = v.quantity > 0
        ? `<span style="color: var(--success-color);">Ativa</span>`
        : `<span style="color: var(--danger-color);">Esgotada</span>`;

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><strong>${v.name}</strong></td>
        <td>${v.coinCost} 💰</td>
        <td>${v.quantity} unidades</td>
        <td>${v.totalRedemptions ?? 0} resgates</td>
        <td>${status}</td>
        <td>
          <div class="flex gap-1">
            <a href="editar-vantagem.html?id=${v.id}" class="btn btn-secondary" 
               style="padding: 0.5rem 1rem; font-size: 0.875rem;">
               Editar
            </a>
            <button class="btn btn-danger" 
              style="padding: 0.5rem 1rem; font-size: 0.875rem;" 
              onclick="deletarVantagem(${v.id})">
              Excluir
            </button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error(err);
    alert("Erro ao carregar vantagens.");
  }
}

// =============================== DELETAR VANTAGEM ===============================
async function deletarVantagem(id) {
  if (!confirm("Deseja realmente excluir esta vantagem?")) return;

  try {
    const response = await fetch(`${API}advantages/advantage/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Erro ao excluir");

    alert("Vantagem excluída com sucesso!");
    location.reload();

  } catch (err) {
    console.error(err);
    alert("Erro ao excluir vantagem.");
  }
}
