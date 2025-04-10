document.addEventListener("DOMContentLoaded", function () {
    // Bouton : Modifier mot de passe
    const passwordBtn = document.querySelector(".profile-buttons button:nth-of-type(1)");
    const passwordBox = document.getElementById("passwordBox");
  
    if (passwordBtn && passwordBox) {
      passwordBtn.addEventListener("click", () => {
        passwordBox.style.display = "flex";
      });
    }

    const infoBtn = document.querySelector(".profile-buttons button:nth-of-type(2)");
    const infoBox = document.getElementById("infoBox");
  
    if (infoBtn && infoBox) {
      infoBtn.addEventListener("click", () => {
        infoBox.style.display = "flex";
      });
    }
  });
  

  function closeModal() {
    document.getElementById("passwordBox").style.display = "none";
  }
  

  function closeInfoModal() {
    document.getElementById("infoBox").style.display = "none";
  }
  

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
  
    alert("Mot de passe mis à jour avec succès");
    closeModal();
  }
  
// Fonction pour enregistrer les informations de l'utilisateur
  function saveInfo() {
    const email = document.getElementById("newEmail").value;
    const company = document.getElementById("newCompany").value;
  
    if (email.trim() === "" || company.trim() === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
  
    document.querySelector(".profile-info p:nth-of-type(1)").innerHTML = `<strong>Email:</strong> ${email}`;
    document.querySelector(".profile-info p:nth-of-type(2)").innerHTML = `<strong>Compagnie:</strong> ${company}`;
  
    alert("Informations mises à jour avec succès");
    closeInfoModal();
  }
//le bouton "Stage"
document.addEventListener("DOMContentLoaded", function () {
    const stageBtn = document.querySelector(".profile-buttons button:nth-of-type(3)");
    const stageBox = document.getElementById("stageBox");
  
    if (stageBtn && stageBox) {
      stageBtn.addEventListener("click", () => {
        stageBox.style.display = "flex";
      });
    }
  });
  

  function closeStageModal() {
    document.getElementById("stageBox").style.display = "none";
  }

  //Fonction saveStage : 
  function saveStage(event) {
    event.preventDefault(); // empêche l'envoi classique du formulaire
  
    const compagnie = document.getElementById("compagnie").value;
    const dep = document.getElementById("dep").value;
    const coordo = document.getElementById("coordo").value;
    const poste = document.getElementById("poste").value;
    const duree = document.getElementById("duree").value;
    const description = document.getElementById("description").value;
    const adress = document.getElementById("adress").value;
    const taux = document.getElementById("taux_horaire").value;
  
    // Créer la carte de stage
    const stageCard = document.createElement("div");
    stageCard.classList.add("stage-card");
    stageCard.innerHTML = `
      <h4>${poste} chez ${compagnie}</h4>
      <p><strong>Département :</strong> ${dep}</p>
      <p><strong>Coordinateur :</strong> ${coordo}</p>
      <p><strong>Durée :</strong> ${duree} mois</p>
      <p><strong>Description :</strong> ${description}</p>
      <p><strong>Adresse :</strong> ${adress}</p>
      <p><strong>Taux horaire :</strong> ${taux} $</p>
    <button class="delete-stage">Supprimer</button>
    `;
  
    // Ajoute la carte à la liste
    const stageList = document.getElementById("stageList");
    stageList.appendChild(stageCard);

    //Supprimer le stage ajouter
    stageCard.querySelector(".delete-stage").addEventListener("click", () => {
        stageCard.remove();
      });
    
  
    // Réinitialise le formulaire
    event.target.reset();
  
    // Ferme la modale
    closeStageModal();
  }
  