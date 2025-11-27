// Mesma base usada no perfil
const API = "https://sistema-de-moeda-estudantil-r46j.onrender.com/api/api/";

document.addEventListener("DOMContentLoaded", () => {
  const empresaId = localStorage.getItem("empresaId");

  if (!empresaId) {
    alert("Erro: empresa não logada.");
    window.location.href = "../index.html";
    return;
  }

  // Preenche o campo hidden
  document.getElementById("empresaId").value = empresaId;

  const form = document.getElementById("formVantagem");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      companyId: parseInt(empresaId),
      name: document.getElementById("nome").value.trim(),
      description: document.getElementById("descricao").value.trim(),
      coinCost: parseInt(document.getElementById("custo").value),
      quantity: parseInt(document.getElementById("quantidade").value),
      photoUrl: document.getElementById("imagem").value.trim() || null
    };

    console.log("Enviando payload:", payload);

    try {
      const response = await fetch(`${API}advantages/advantage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const erro = await response.text();
        console.error("Erro no backend:", erro);
        throw new Error("Erro ao cadastrar vantagem.");
      }

      mensagem.innerHTML = `
        <div class="alert alert-success">
          Vantagem cadastrada com sucesso!
        </div>
      `;

      // Redireciona após 1.2s
      setTimeout(() => {
        window.location.href = "vantagens.html";
      }, 1200);

    } catch (error) {
      mensagem.innerHTML = `
        <div class="alert alert-danger">
          Ocorreu um erro ao cadastrar a vantagem. Tente novamente.
        </div>
      `;
      console.error("Erro ao cadastrar:", error);
    }
  });
});
