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

  let objet = {
    id: Date.now() + Math.random(),
    nom: nom,
    duree: duree
  };

  inv[categorie].push(objet);

  setInventaire(inv);
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
  div.innerHTML = "";

  if (liste.length === 0) {
    div.innerHTML = "<p>Vide</p>";
    return;
  }

  for (let item of liste) {

    let bloc = document.createElement("div");

    bloc.classList.add("objet");

    bloc.innerHTML = `
      <p><b>${item.nom}</b></p>
      <p>Durée : ${item.duree}</p>
      <button onclick="manger('${item.id}')">Action</button>
    `;

    div.appendChild(bloc);
  }
}


