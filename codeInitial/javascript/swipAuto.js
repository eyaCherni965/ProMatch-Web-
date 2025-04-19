const cards = [
  { titre: "Développeur Web - React", lieu: " Montréal • 4 mois" },
  { titre: "Analyste de données", lieu: " Québec • 6 mois" },
  { titre: "UI/UX Designer", lieu: " Remote • 3 mois" },
  { titre: "Stage Cybersécurité", lieu: " Laval • 5 mois" }
];

const card = document.getElementById('stageCard');
const titre = document.getElementById('stageTitre');
const lieu = document.getElementById('stageLieu');
let index = 0;

function showNextCard() {
  const direction = Math.random() > 0.5 ? 'swipe-right' : 'swipe-left';
  card.classList.add(direction);

  setTimeout(() => {
    index = (index + 1) % cards.length;
    titre.textContent = cards[index].titre;
    lieu.textContent = cards[index].lieu;
    card.classList.remove('swipe-left', 'swipe-right');
  }, 1000);
}

setInterval(showNextCard, 5000); // change toutes les 3 secondes
