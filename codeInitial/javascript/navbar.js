document.addEventListener("DOMContentLoaded", function () {
  console.log("JS chargé !");
  
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  
  if (!menuBtn || !sidebar) {
    console.error("menuBtn ou sidebar introuvable !");
    return;
  }

  const sidebarLinks = sidebar.querySelectorAll('a');

  // Ouvre/ferme la sidebar
  menuBtn.addEventListener('click', () => {
    sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
  });

  // Ferme la sidebar au clic sur un lien
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.style.width = '0';
    });
  });
});
