function getArmeEquipee() {

  let arme = localStorage.getItem("armeEquipee");

  if (!arme) {
    arme = "lance en bois";
    localStorage.setItem("armeEquipee", arme);
  }

  return arme;
}

function equiperArme(index) {

  let inv = getInventaire();

  let objet = inv.armes[index];

  localStorage.setItem("armeEquipee", objet.nom);

  localStorage.setItem(
    "nouveauMessage",
    "Tu équipes : " + objet.nom
  );

  afficherInventaire();
}