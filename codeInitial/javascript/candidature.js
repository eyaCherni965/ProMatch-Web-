document.addEventListener("DOMContentLoaded", () => {
    // Récupère tous les éléments avec la classe "candidature"
    const candidatures = document.querySelectorAll(".candidature");
  
    let accepted = 0, refused = 0, pending = 0;
  
    candidatures.forEach(c => {
      if (c.classList.contains("acceptee")) accepted++;
      else if (c.classList.contains("refusee")) refused++;
      else if (c.classList.contains("enAttente")) pending++;
    });
  
    const total = accepted + refused + pending;
  
    // Calcul des pourcentages
    const acceptedPercent = (accepted / total) * 100;
    const refusedPercent = (refused / total) * 100;
    const pendingPercent = (pending / total) * 100;
  
    // Mise à jour des barres
    document.getElementById("accepted-bar").style.width = acceptedPercent + "%";
    document.getElementById("refused-bar").style.width = refusedPercent + "%";
    document.getElementById("pending-bar").style.width = pendingPercent + "%";
  
    // Affichage des nombres
    document.getElementById("accepted-count").textContent = accepted;
    document.getElementById("refused-count").textContent = refused;
    document.getElementById("pending-count").textContent = pending;
  });
  