window.onload = () => {
    const id = localStorage.getItem("id_employeur");
    const courriel = localStorage.getItem("email");

    if (id && courriel) {
      document.getElementById("id_employeur").value = id;
      document.getElementById("courriel").value = courriel;
    } else {
      alert("Informations de connexion manquantes. Veuillez vous reconnecter.");
    }
  };

