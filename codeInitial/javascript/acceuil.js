document.addEventListener("DOMContentLoaded", () => {
  console.log("accueil.js bien chargé !");

  const compagnie = localStorage.getItem("compagnie");
  const bienvenueEl = document.getElementById("bienvenue");
  const deconnexionBtn = document.getElementById("logoutBtn");

  if (!compagnie) {
    alert("Vous devez être connecté pour accéder à cette page.");
    window.location.href = "login.html";
    return;
  }

  // Afficher le message de bienvenue
  if (bienvenueEl) {
    bienvenueEl.textContent = 'Bienvenue, ${compagnie} ';
  }

  // Gestion du bouton de déconnexion
  if (deconnexionBtn) {
    deconnexionBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "login.html";
    });
  }
});
