+
  // MEMBRE 3 — Récoltes : calculer la production, le rendement et le revenu.
// Fiche : fiches/3-recoltes.md · Vérifier : 

// Renvoie le total des kilos récoltés sur une parcelle. Aucune récolte : 0.
export function totalRecolte(recoltes, idParcelle) {
  const resultat = recoltes.filter(recolte => recolte.parcelle === idParcelle

  );
   const total = resultat.reduce((somme, recolte) => somme + recolte.kg, 0);
  return total;
// throw new Error("TODO Membre 3 : coder totalRecolte dans src/recoltes.js");
}

// Renvoie le rendement en kg par hectare, arrondi à l'entier le plus proche.
// Une surface nulle ou négative est une erreur : on lance une RangeError.
export function rendement(kg, surface) {
  if (surface <= 0) { 
  throw new RangeError(
    'La surface doit être supérieure à 0'
    ); }
  
}

// Renvoie le revenu estimé en FCFA.
export function revenu(kg, prixKg) {
  return kg * prixKg;
 // throw new Error("TODO Membre 3 : coder revenu dans src/recoltes.js");
}

// Renvoie une ligne de bilan par parcelle, dans le même ordre que parcelles.
// Chaque ligne : { id, producteur, culture, kg, rendement, revenu }
export function bilanRecoltes(parcelles, recoltes, cultures) {
  //throw new Error("TODO Membre 3 : coder bilanRecoltes dans src/recoltes.js");
   return parcelles.map((parcelle) => {
      const kg = totalRecolte(recoltes, parcelle.id);
      const culture = cultures.find(
        (element) => element.code === parcelle.culture,
      );
  
      return {
        id: parcelle.id,
        producteur: parcelle.producteur,
        culture: parcelle.culture,
        kg,
        rendement: rendement(kg, parcelle.surface),
        revenu: revenu(kg, culture.prixKg),
      };
    });
}

// Renvoie une COPIE du bilan, triée du plus grand revenu au plus petit.
// Le tableau reçu ne doit pas changer d'ordre.
export function classerParRevenu(bilan) {
  return [...bilan].sort((a, b) => b.revenu - a.revenu);
  throw new Error(
    //"TODO Membre 3 : coder classerParRevenu dans src/recoltes.js",
  );
}
