document.addEventListener("DOMContentLoaded", function () {
  console.log("JS chargé !");
  
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarLinks = sidebar.querySelectorAll('a');
  const closeBtn = document.querySelector('.close-btn');
  
  if (!menuBtn || !sidebar) {
    console.error("menuBtn ou sidebar introuvable !");
    return;
  }

  // Ouvre/ferme la sidebar
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Ferme la sidebar au clic sur un lien
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });

  // Ferme la sidebar
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

});

