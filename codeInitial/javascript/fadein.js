document.addEventListener("DOMContentLoaded", function () {
    const faders = document.querySelectorAll(".fade-in");
  
    function showOnScroll() {
      faders.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    }
  
    window.addEventListener("scroll", showOnScroll);
    showOnScroll();
  });