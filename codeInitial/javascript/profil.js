// Cibler le bouton "Modifier mon mot de passe"
document.addEventListener("DOMContentLoaded", function () {
    const passwordBtn = document.querySelector(".profile-buttons button:first-child");
    const modal = document.getElementById("passwordModal");
  
    if (passwordBtn && modal) {
      passwordBtn.addEventListener("click", () => {
        modal.style.display = "flex";
      });
    }
  });
  
  function closeModal() {
    document.getElementById("passwordModal").style.display = "none";
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
  
    alert("Mot de passe mis à jour avec succès !");
    closeModal();
  }
  
  