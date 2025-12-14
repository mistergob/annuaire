const data = [
  {
    company: "Atelier Pivoine",
    activity: "Création florale",
    postal: "75011",
    contact: "contact@atelierpivoine.fr · 06 72 45 20 10",
    description: "Bouquets, ateliers floraux et abonnements pour entreprises.",
    logo: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=240&q=80",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    company: "Alpha Plombier",
    activity: "Plomberie",
    postal: "69003",
    contact: "intervention@alphaplombier.fr · 04 78 02 23 45",
    description: "Dépannage en urgence, installation de salles de bain et entretien chaudière.",
    logo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=240&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719478124-c0d07f7d006e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1581579185169-87983c4bfa8c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1582719478187-7684dfd7ea78?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    company: "Cuisine & Co",
    activity: "Traiteur",
    postal: "31000",
    contact: "hello@cuisineandco.fr · 05 61 23 12 00",
    description: "Buffets, cocktails et plateaux-repas pour vos événements professionnels.",
    logo: "https://images.unsplash.com/photo-1604908177760-1c8c14b4b26c?auto=format&fit=crop&w=240&q=80",
    images: [
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    company: "Lumin Studio",
    activity: "Photographie",
    postal: "44000",
    contact: "contact@luminstudio.fr · 07 80 12 54 33",
    description: "Portraits, reportages et shootings produits pour valoriser votre marque.",
    logo: "https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&w=240&q=80",
    images: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
    ]
  }
];

const resultsContainer = document.getElementById("results");
const form = document.getElementById("search-form");
const template = document.getElementById("card-template");

function renderCards(list) {
  resultsContainer.innerHTML = "";

  if (list.length === 0) {
    resultsContainer.innerHTML = '<p class="hint">Aucune annonce ne correspond à votre recherche pour le moment.</p>';
    return;
  }

  list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    const [img1, img2, img3] = clone.querySelectorAll(".gallery img");
    clone.querySelector(".logo").src = item.logo;
    img1.src = item.images[0];
    img2.src = item.images[1];
    img3.src = item.images[2];
    clone.querySelector(".company-name").textContent = item.company;
    clone.querySelector(".meta").textContent = `${item.activity} · ${item.postal}`;
    clone.querySelector(".contact").textContent = item.contact;
    clone.querySelector(".description").textContent = item.description;
    resultsContainer.appendChild(clone);
  });
}

function filterData(postal, activity) {
  const postalFilter = postal.trim();
  const activityFilter = activity.trim().toLowerCase();

  return data.filter((item) => {
    const postalMatch = postalFilter ? item.postal.startsWith(postalFilter) : true;
    const activityMatch = activityFilter
      ? item.activity.toLowerCase().includes(activityFilter) || item.company.toLowerCase().includes(activityFilter)
      : true;
    return postalMatch && activityMatch;
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const postal = form.postal.value;
  const activity = form.activity.value;
  const filtered = filterData(postal, activity);
  renderCards(filtered);
});

renderCards(data);
