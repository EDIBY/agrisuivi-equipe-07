// ÉQUIPE — Rapport : assembler le travail des quatre membres.
// Fiche : fiches/5-equipe-rapport.md · Vérifier : npm run test:rapport
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { surfaceTotale } from "./parcelles.js";
import { alertesIrrigation } from "./irrigation.js";
import { bilanRecoltes, classerParRevenu } from "./recoltes.js";

// Renvoie les id des alertes qui ont cet état, séparés par ', ', ou 'aucune'.
export function listerParEtat(alertes, etat) {
  const correspondantes = alertes.filter(function (alerte) {
    return alerte.etat === etat;
  });
const listelds = correspondantes.map(function (alerte) {
  return alerte.id
});
if (listelds.length === 0) {
  return "aucune"
}
return listelds.join(", ");
}

// Renvoie le texte complet du rapport (voir fiches/5-equipe-rapport.md).
export function construireRapport(donnees, date) {
  const { parcelles, cultures, releves, recoltes } = donnees;
  const surface = surfaceTotale(parcelles);
  const alertes = alertesIrrigation (parcelles, cultures, releves)
  const aArroser = listerParEtat(alertes, "ARROSER");
  const aDrainer = listerParEtat(alertes, "DRAINER");
  const sansReleve = listerParEtat(alertes, "INCONNU");

  const bilan = bilanRecoltes(parcelles, cultures, recoltes);
  const productionTotale = bilan.reduce(function (somme, ligne) {
    return somme + ligne.production;
  },0);
  const revenuTotal = bilan.reduce(function (somme, ligne) {
    return somme + ligne.revenu;
  },0);

  const classement = classerParRevenu(bilan);
  const meilleur = classement[0];
  const lignes = [
    "=== RAPPORT AGRISUIVI " + date + " ===",
    "Parcelles suivies : " + parcelles.length,
    "Surface totales : " + surface + " ha",
    "",
    "---Irrigation---",
    "  à arroser : " + aArroser,
    "  à drainer : " + aDrainer,
    "  sans relevé : " + sansReleve,
    "Bilan des récoltes :",
    " Production totale : " + productionTotale + " kg",
    " Revenu total : " + revenuTotal + " FCFA",
    " Meilleure parcelle : " + meilleur.id + "(" + meilleur.proprietaire + ") avec  " + meilleur.revenu + " FCFA"
  ];

  return lignes.join("\n") + "\n";
}

// Écrit le texte dans le fichier demandé. Crée le dossier s'il n'existe pas.
export async function enregistrerRapport(chemin, texte) {
 const dossier = dirname(chemin);
 await mkdir(dossier, { recursive: true });
 await writeFile(chemin, texte, "utf8");
}


