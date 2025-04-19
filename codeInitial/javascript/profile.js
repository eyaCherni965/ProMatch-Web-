let nomGlobal = "";
let prenomGlobal = "";
let emailGlobal = "";
let compagnieGlobal = "";
let mdpGlobal = "";

document.addEventListener("DOMContentLoaded", function () {
  const ID_EMPLOYEUR = localStorage.getItem('id_employeur');
  const container = document.getElementById('profile-container');

  if (!ID_EMPLOYEUR) {
    alert('Vous devez être connecté pour accéder à cette page');
    window.location.href = 'login.html';
    return;
  }

  fetch(`/profil/${ID_EMPLOYEUR}`)
    .then(res => {
      if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
      return res.json();
    })
    .then(infos => {
      const { nom, prenom, email, compagnie, mdp} = infos[0];
      nomGlobal = nom;
      prenomGlobal = prenom;
      emailGlobal = email;
      compagnieGlobal = compagnie;
      mdpGlobal = mdp;

      container.innerHTML = `
        <div class="profile-book">
          <div class="profile-page left-page"></div>
          <div class="profile-page right-page"></div>
          <div class="profile-card">
            <h1>Bonjour, ${prenom} ${nom}</h1>
            <div class="profile-picture">
              <img src="img/thumbnail_image.png" alt="Photo de profil">
            </div>
            <div class="profile-info">
              <h2>Informations personnelles</h2>
              <p><strong>Email:</strong> <span id="profileEmail">${email}</span></p>
              <p><strong>Compagnie:</strong> <span id="profileCompany">${compagnie}</span></p>
            </div>
            <div class="profile-buttons">
              <button id="btnPassword">Modifier mon mot de passe</button>
              <button id="btnInfo">Modifier mes informations</button>
            </div>
            <div class="stage-list" id="stageList"></div>
          </div>
        </div>
      `;

      // Ajout des événements
      document.getElementById("btnPassword").addEventListener("click", () => {
        document.getElementById("passwordBox").style.display = "flex";
      });

      document.getElementById("btnInfo").addEventListener("click", () => {
        document.getElementById("infoBox").style.display = "flex";
      });
    })
    .catch(err => {
      console.error("Erreur lors du chargement du profil :", err);
      alert("Erreur lors du chargement du profil");
    });
});
// Changer mot de passe
function savePassword() {
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;

  if (newPass.trim() === "" || confirmPass.trim() === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  const ID_EMPLOYEUR = localStorage.getItem('id_employeur');

  fetch('/updateProfil', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_employeur: ID_EMPLOYEUR,
      nom: nomGlobal,
      prenom: prenomGlobal,
      email: emailGlobal,
      compagnie: compagnieGlobal,
      mdp: newPass
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      return res.text();
    })
    .then(data => {
      alert(data);
      closeModal();
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de la mise à jour du mot de passe");
    });
}

  const infoBtn = document.querySelector(".profile-buttons button:nth-of-type(2)");
  const infoBox = document.getElementById("infoBox");

  function closeModal() {
    document.getElementById("passwordBox").style.display = "none";
  }


  function closeInfoModal() {
    document.getElementById("infoBox").style.display = "none";
  }

// Changer autres infos
function saveInfo() {
  const newEmail = document.getElementById("newEmail").value;
  const newComp = document.getElementById("newCompany").value;

  if (newEmail.trim() === "" && newComp.trim() === "") {
    alert("Veuillez remplir un des champs.");
    return;
  }

  const ID_EMPLOYEUR = localStorage.getItem('id_employeur');

  // Met à jour les valeurs globales si nécessaires
  const updatedEmail = newEmail || emailGlobal;
  const updatedCompagnie = newComp || compagnieGlobal;

  fetch('/updateProfil', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id_employeur: ID_EMPLOYEUR,
      nom: nomGlobal,
      prenom: prenomGlobal,
      email: updatedEmail,
      compagnie: updatedCompagnie,
      mdp: mdpGlobal
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Erreur lors de la mise à jour");
    return res.text();
  })
  .then(data => {
    alert(data);
    closeInfoModal();
    location.reload();
  })
  .catch(err => {
    console.error(err);
    alert("Erreur lors de la mise à jour des informations");
  });
}
