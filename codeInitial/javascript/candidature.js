document.addEventListener('DOMContentLoaded', () => {
  const ID_EMPLOYEUR = localStorage.getItem('id_employeur');
  console.log("🧠 ID récupéré du localStorage :", ID_EMPLOYEUR);

  if (!ID_EMPLOYEUR) {
    alert('Vous devez être connecté pour accéder à cette page');
    window.location.href = 'login.html';
    return;
  }

  fetch(`/candidatures/${ID_EMPLOYEUR}`)
    .then(res => {
      console.log("📡 Réponse reçue du serveur :", res);
      return res.json();
    })
    .then(candidats => {
      console.log("📦 Candidats reçus :", candidats);
      const container = document.getElementById('liste-container');
      container.innerHTML = '';

      candidats.forEach(candidat => {
        const div = document.createElement('div');
        div.className = "candidature-card";
        div.innerHTML = `
          <strong>${candidat.nom} ${candidat.prenom}</strong><br>
          Poste: ${candidat.nom_poste}<br>
          CV: ${candidat.CV || 'Non disponible'}<br>
          Statut: <span class="statut" id="statut-${candidat.id_candidature}">${candidat.statut}</span><br>
          <button onclick="ChangerStatut(${candidat.id_candidature}, 'acceptée')">Accepter</button> 
          <button onclick="ChangerStatut(${candidat.id_candidature}, 'refusée')">Refuser</button>
        `;

        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Erreur lors du chargement des candidatures :", err);
      alert("Erreur de chargement des candidatures.");
    });
});

function ChangerStatut(id_candidature, nvxStatut) {
  fetch('/candidature/statut', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_candidature, statut: nvxStatut }) 
  })
    .then(() => {
      const statutElement = document.getElementById(`statut-${id_candidature}`);
      if (statutElement) {
        statutElement.textContent = nvxStatut;
        statutElement.className = `statut ${nvxStatut.toLowerCase()}`; 
        alert(`Le statut a été mis à jour : "${nvxStatut}"`);
      }
    });
}
