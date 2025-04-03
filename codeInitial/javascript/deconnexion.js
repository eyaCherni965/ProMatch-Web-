function logout() {
<<<<<<< Updated upstream
    fetch("http://localhost:8080/deconnexion", {
      method: "POST",
      credentials: "include" 
    }).then(() => {
      alert("Déconnexion réussie")
      localStorage.clear();
=======
  fetch("http://localhost:8080/deconnexion", {
    method: "POST",
    credentials: "include"
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur serveur : " + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log("Déconnexion réussie :", data.message || "");
      localStorage.clear();
      alert("Déconnexion réussie");
>>>>>>> Stashed changes
      window.location.href = "index.html";
    })
    .catch(error => {
      console.error("Erreur de déconnexion :", error);
      alert("Erreur pendant la déconnexion");
    });
}
