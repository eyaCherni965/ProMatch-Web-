document.addEventListener("DOMContentLoaded", function () {
    console.log("JS chargé !");
    const container = document.querySelector('.login-container');
    const btnInscrire = document.querySelector('.btn-inscrire');
    const btnConnecter = document.querySelector('.btn-connecter');

    //Lorsque l'utilisateur clique sur le bouton "S'inscrire" la classe active esr
    // ajoutée à la div login-container => affichage de inscription
    btnInscrire.addEventListener('click', () => {
        container.classList.add('active');
    });

    //Lorsque l'utilisateur clique sur le bouton "Se connecter" la classe active est
    // supprimée de la div login-container => affichage de connexion
    btnConnecter.addEventListener('click', () => {
        container.classList.remove('active');
    });
});
