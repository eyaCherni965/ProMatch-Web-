document.addEventListener("DOMContentLoaded", function () {
  const ID_EMPLOYEUR = localStorage.getItem('id_employeur');
  console.log("ID récupéré du localStorage :", ID_EMPLOYEUR);

  if (!ID_EMPLOYEUR) {
    alert('Vous devez être connecté pour accéder à cette page');
    window.location.href = 'login.html';
    return;
  }
/*
  <div class="profile-container">
    <div class="profile-book">
      <div class="profile-page left-page"></div>
      <div class="profile-page right-page"></div>
   
    <div class="profile-card">
      
      <h1>Bonjour, {{ user.name }}</h1>


      <div class="profile-picture">
        <img src="img/thumbnail_image.png" alt="Photo de profil">
      </div>

  
      <div class="profile-info">
        <h2>Informations personnelles</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Compagnie:</strong> {{ user.compagnie }}</p>
      </div>

      <div class="profile-buttons">
        <button>Modifier mon mot de passe</button>
        <button>Modifier mes informations</button>
      </div>
      <div class="stage-list" id="stageList"></div>
    </div>
  </div> */
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

