function logout() {
    fetch("http://localhost:8080/deconnexion", {
      method: "POST",
      credentials: "include" 
    }).then(() => {
      alert("Déconnexion réussie")
      localStorage.clear();
      window.location.href = "index.html";
    }).catch(error => {
      console.error("Erreur de déconnexion :", error);
    });
  }