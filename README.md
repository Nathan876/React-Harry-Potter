# 🧙 Potterdle

> Un jeu de devinettes inspiré de *"Un Jour Un Film"*, appliqué à l'univers d'Harry Potter.  
> Chaque partie, une ressource mystère (personnage, potion ou sort) est tirée au sort — devinez-la grâce aux comparaisons de métadonnées !

---

## 🎯 Présentation

**Potterdle** est un projet frontend réalisé dans le cadre de nos études à Coda_.  
Il s'inscrit dans le concept *"Un Jour, Une Ressource"* : une ressource mystère de l'univers Harry Potter est tirée au sort, et le joueur doit l'identifier en proposant des ressources du même type.

Après chaque tentative, une comparaison visuelle champ par champ révèle les similarités entre la proposition et la cible — jusqu'à la victoire !

---

## 🌍 Univers sélectionné

**Thématique :** Harry Potter

L'univers de J.K. Rowling offre une richesse de métadonnées idéale pour ce type de jeu : personnages avec maison, baguette, statut ou espèce ; potions avec effets et ingrédients ; sorts avec type et niveau de difficulté.

<!-- Précisez ici les types de ressources jouables : personnages / potions / sorts -->

---

## 👥 Membres de l'équipe

| Nom | Rôle | Contributions principales |
|-----|------|--------------------------|
| Nathan Chabalier | Designer / Lead Front | Charte graphique, intégration CSS, mise en page des composants |
| Cécile Fischer | Intégratrice / API | Appels API, autocomplete, gestion des données et des states |

> L'ensemble des fonctionnalités a été développé conjointement par les deux membres de l'équipe,
> chacun apportant son expertise sur sa zone de responsabilité principale.
---

## 🔌 API utilisée

**API :** [PotterDB](https://potterdb.com/)

---

## ✨ Fonctionnalités

### ✅ Obligatoires

- [x] Tirage aléatoire d'une ressource mystère depuis l'API au chargement
- [x] Champ de saisie avec autocomplete lié à la base de données API
- [x] Comparaison visuelle champ par champ
- [x] Détection et affichage de l'état de victoire

### 🌟 Recommandées

- [x] Historique des tentatives précédentes
- [x] Feedback visuel distinctif (match exact 🟩 / match partiel 🟨 / aucun match 🟥)
- [x] Gestion de fin de partie (option de rejouer)

### 🚀 Bonus

- [x] Sauvegarde de la partie en cours dans le `localStorage`
- [x] Ressource du jour (seed basée sur la date — même ressource pour tous)
- [x] Rejouer les jours précédents depuis leur seed historique

---

## 🛠 Technologies utilisées

| Technologie      | Usage                                                 |
|------------------|-------------------------------------------------------|
| **React + Vite** | Composants fonctionnels, hooks natifs, bundler rapide |
| **TypeScript**   | Typage fort des données API et des états du jeu       |
| **React Router** | Navigation entre les pages                            |
| **Tailwind CSS** | Bibliothèque css                                      |

---

## 🚀 Installation

### Prérequis

- Node.js `>= 18.x`
- npm ou yarn

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/Nathan876/React-Harry-Potter.git

# 2. Se déplacer dans le dossier
cd React-Harry-Potter

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173)

---

## 🎮 Utilisation

1. Ouvrir l'application sur http://localhost:5173
2. Une ressource mystère est automatiquement tirée au sort
3. Taper le nom d'un personnage / potion / sort dans le champ de recherche
4. Sélectionner personnage / potion / sort dans la liste de l'autocomplete
5. Répéter jusqu'à trouver la bonne réponse !

---

## 📄 Licence

Projet réalisé dans le cadre de la formation **Coda_**.