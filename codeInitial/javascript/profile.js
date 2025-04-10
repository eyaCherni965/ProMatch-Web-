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

