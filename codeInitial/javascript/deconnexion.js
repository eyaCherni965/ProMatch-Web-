function logout() {
    fetch("http://localhost:8080/deconnexion", {
      method: "POST",
      credentials: "include" 
    }).then(() => {
      localStorage.empty();
      window.location.href = "index.html";
    }).catch(error => {
      console.error("Erreur de déconnexion :", error);
    });
  }