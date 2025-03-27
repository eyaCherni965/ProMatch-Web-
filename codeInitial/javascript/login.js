document.addEventListener("DOMContentLoaded", () => {
    console.log("Formulaires : ", document.querySelector('.connexion form'), document.querySelector('.inscription form'));

    console.log("JS chargé ");
  
    const container = document.querySelector('.login-container');
    const btnInscrire = document.querySelector('.btn-inscrire');
    const btnConnecter = document.querySelector('.btn-connecter');
  
    // Animation pour changer entre les vues
    btnInscrire.addEventListener('click', () => container.classList.add('active'));
    btnConnecter.addEventListener('click', () => container.classList.remove('active'));
  
    // Connexion
    const loginForm = document.querySelector('.connexion form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const email = document.querySelector('#email-login').value;
        const mdp = document.querySelector('#mdp-login').value;
  
        try {
          const response = await fetch("http://localhost:8080/connexion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, mdp })
          });
  
          console.log("Réponse brute :", response);

          const data = await response.json();
  
          if (response.ok) {
            localStorage.setItem("id_employeur", data.id_employeur);
            localStorage.setItem("compagnie", data.compagnie);
            window.location.href = "acceuil_TCH099.html";
          } else {
            alert(data.message);
          }
        } catch (err) {
          console.error("Erreur de connexion :", err);
          alert("Erreur réseau lors de la connexion.");
        }
      });
    }
  
    // Inscription
    const signupForm = document.querySelector('.inscription form');
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const nom = document.querySelector('#nom').value;
        const prenom = document.querySelector('#prenom').value;
        const email = document.querySelector('#email-inscription').value;
        const mdp = document.querySelector('#mdp').value;
        const password2 = document.querySelector('#password2').value;
        const compagnie = document.querySelector('#compagnie').value;
  
        try {
          const response = await fetch("http://localhost:8080/inscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, prenom, email, mdp, password2, compagnie })
          });
  
          const data = await response.text();
  
          if (response.ok) {
            alert("Inscription réussie");
            container.classList.remove('active');
          } else {
            alert("Erreur : " + data);
          }
        } catch (err) {
          console.error("Erreur d'inscription :", err);
          alert("Erreur réseau lors de l'inscription.");
        }
      });
    }
  });
  