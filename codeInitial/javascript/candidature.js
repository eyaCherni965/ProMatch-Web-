document.addEventListener('DOMContentLoaded', () => {
  const ID_EMPLOYEUR = localStorage.getItem('id_employeur');
  console.log("ID récupéré du localStorage :", ID_EMPLOYEUR);

  if (!ID_EMPLOYEUR) {
    alert('Vous devez être connecté pour accéder à cette page');
    window.location.href = 'login.html';
    return;
  }

  fetch(`/candidatures/${ID_EMPLOYEUR}`)
    .then(res => {
      console.log("Réponse reçue du serveur :", res);
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      return res.json();
    })  
    .then(candidats => {
      console.log("Candidats reçus :", candidats);
      const container = document.getElementById('liste-container');
      if (!container) {
        console.error("Aucun élément avec l'id 'liste-container' trouvé !");
        return;
      } else {
        console.log(" Élément #liste-container trouvé !");
        container.innerHTML += "<p>Le JS est bien exécuté !</p>";
      }
      
      container.innerHTML = '';

      candidats.forEach(candidat => {
        const div = document.createElement('div');
        div.className = "candidature-card";
        div.innerHTML = `
          <div class="card-content">
            <div class="infos">
              <strong>${candidat.prenom} ${candidat.nom}</strong><br>
              ${candidat.nom_poste}<br>
              ${candidat.url_cv || 'Non disponible'}<br>
              <br><span class="statut ${candidat.statut.toLowerCase()}" id="statut-${candidat.id_candidature}">
              ${candidat.statut}
            </span>
            </div>
            <div class="button-container">
              <button onclick="ChangerStatut(${candidat.id_candidature}, 'acceptée')">Accepter</button> 
              <button onclick="ChangerStatut(${candidat.id_candidature}, 'refusée')">Refuser</button>
              <button>Voir candidature</button>
            </div>
          </div>
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
  fetch('/candidatures/statut', {
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

statutElement.classList.add("statut-change");
setTimeout(() => statutElement.classList.remove("statut-change"), 400);

}
