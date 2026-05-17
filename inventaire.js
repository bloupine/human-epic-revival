
function initialiserInventaire() {

  if (!localStorage.getItem("inventaire")) {

    let inventaire = {
      nourriture: [],
      armes: [],
      hygiene: [],
      securite: []
    };

    localStorage.setItem("inventaire", JSON.stringify(inventaire));
  }
}

function getInventaire() {
  return JSON.parse(localStorage.getItem("inventaire"));
}

function setInventaire(inv) {
  localStorage.setItem("inventaire", JSON.stringify(inv));
}

function ajouterObjet(categorie, nom, duree = 0) {

  let inv = getInventaire();

  let item = {
    nom: nom,
    qty: 1,
    duree: ITEMS[nom].duree || 0
  };

  if (!inv[categorie]) {
    inv[categorie] = [];
  }

  inv[categorie].push(item);

  saveInventaire(inv);
}

function saveInventaire(inventaire) {
  localStorage.setItem("inventaire", JSON.stringify(inventaire));
}

function afficherInventaire() {

  let inv = getInventaire();

  afficherCategorie("nourriture", inv.nourriture);
  afficherCategorie("armes", inv.armes);
  afficherCategorie("hygiene", inv.hygiene);
  afficherCategorie("securite", inv.securite);
}

function afficherCategorie(categorie, liste) {

  let div = document.getElementById(categorie);
  if (!div) return;

  div.innerHTML = "";

 for (let index = 0; index < liste.length; index++) {

    let item = liste[index];

    let info = ITEMS[item.nom];

    let bloc = document.createElement("div");

    bloc.classList.add("objet");

    let boutons = "";

    if (categorie === "nourriture") {

     boutons += `
    <button onclick="mangerObjet('${categorie}', ${index})">
      Manger
    </button>
  `;

     boutons += `
    <button onclick="vendreObjet('${categorie}', ${index})">
      Vendre
    </button>
  `;
}

    if (categorie === "armes") {

    boutons += `
    <button onclick="equiperArme(${index})">
      Utiliser
    </button>
  `;
}

    bloc.innerHTML = `
     <p><b>${item.nom}</b></p>
    <p>Prix : ${info ? info.prix : "?"}</p>
    <p>Durée : ${item.duree}</p>

    ${boutons}
`;
    div.appendChild(bloc);
  }
}

function mangerObjet(categorie, index) {

  let inv = getInventaire();

  let objet = inv[categorie][index];

  inv[categorie].splice(index, 1);

  saveInventaire(inv);

  localStorage.setItem(
    "nouveauMessage",
    "Tu as mangé : " + objet.nom
  );

  afficherInventaire();
}

function vendreObjet(categorie, index) {

  let inv = getInventaire();

  let objet = inv[categorie][index];

  let info = ITEMS[objet.nom];

  ajouterArgent(info.prix);

  inv[categorie].splice(index, 1);

  saveInventaire(inv);

  localStorage.setItem(
    "nouveauMessage",
    "Tu as vendu : " + objet.nom
  );

  afficherInventaire();
}