function initialiserArgent() {

  if (localStorage.getItem("argent") === null) {
    localStorage.setItem("argent", "0");
  }
}

function afficherArgent() {

  let argent = localStorage.getItem("argent");

  let element = document.getElementById("argent");

  if (element) {
    element.textContent = "💰 Rotules : " + argent;
  }
}

function ajouterArgent(montant) {

  let argent = parseInt(localStorage.getItem("argent"));

  argent += montant;

  localStorage.setItem("argent", argent);

  afficherArgent();
}