document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const body = document.body;
  const sidebarLinks = sidebar.querySelectorAll('a');
  const closeBtn = document.getElementById('closeBtn');

  if (!menuBtn || !sidebar) {
    console.error("menuBtn ou sidebar introuvable !");
    return;
  }

  // Ouvre/ferme la sidebar
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    
    if (sidebar.classList.contains('open')) {
      body.classList.add('sidebar-open');
    } else {
      body.classList.remove('sidebar-open');
    }
  });

  // Ferme la sidebar au clic sur un lien
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      body.classList.remove('sidebar-open');
    });
  });

  // Ferme la sidebar au clic sur le x
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      body.classList.remove('sidebar-open');
    });
  }
});
