document.addEventListener('DOMContentLoaded', () => {
  const ID_EMPLOYEUR = localStorage.getItem('id_employeur');
  if (!ID_EMPLOYEUR) {
    alert('Vous devez être connecté pour accéder à cette page');
    window.location.href = 'login.html';
    return;
  }

  fetch(`/candidatures/${ID_EMPLOYEUR}`)
    .then(res => res.json())
    .then(candidats => {
      const container = document.getElementById('liste-container');
      container.innerHTML = '';

      candidats.forEach(candidat => {
        const div = document.createElement('div');
        div.innerHTML = `
          <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; border-radius:8px;">
            <strong>${candidat.nom} ${candidat.prenom}</strong><br>
            Poste: ${candidat.nom_poste}<br>
            CV: ${candidat.CV || 'Non disponible'}<br>
            Statut: <span class="statut" id="statut-${candidat.id_candidature}">${candidat.statut}</span><br>
            <button onclick="ChangerStatut(${candidat.id_candidature}, 'acceptée')">Accepter</button> 
            <button onclick="ChangerStatut(${candidat.id_candidature}, 'refusée')">Refuser</button>
          </div>`;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Erreur lors du chargement des candidatures :", err);
      alert("Erreur de chargement des candidatures.");
    });
});

function ChangerStatut(id_candidature, nvxStatut) {
  fetch('/api/candidature/statut', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_candidature, statut: nvxStatut })
  })
    .then(() => {
      const statutElement = document.getElementById(`statut-${id_candidature}`);
      if (statutElement) {
        statutElement.textContent = nvxStatut;
        alert(`Le statut a été mis à jour : "${nvxStatut}"`);
      }
    })
    .catch(err => {
      console.error('Erreur lors de la mise à jour du statut:', err);
      alert("Erreur de la mise à jour.");
    });
}
