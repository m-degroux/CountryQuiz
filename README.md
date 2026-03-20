# Country Explorer & Quiz

Une application web interactive développée avec **Vue.js 3** permettant d'explorer les pays du monde, de suivre ses voyages et de tester ses connaissances géographiques.

## Fonctionnalités

### Exploration et Recherche
* **Affichage dynamique** : Liste des pays récupérée via l'API RestCountries (nom, drapeau, population, région).
* **Filtrage multicritère** : Recherche par nom de pays et filtrage par zone géographique (Afrique, Amériques, Asie, Europe, Océanie).
* **Fiche détaillée** : Vue complète incluant les capitales, langues parlées, devises et pays frontaliers.

### Modules de Quiz
* **Quiz Drapeaux** : Identifier le bon pays parmi 4 propositions basées sur la même région pour augmenter la difficulté.
* **Quiz Capitales** : Saisir le nom de la capitale avec un système de score et de "Meilleur Score" (Best Score).

### Carnet de Voyage (Visited)
* **Gestion des visites** : Ajouter ou retirer des pays de sa liste personnelle.
* **Sauvegarde persistante** : Utilisation du `localStorage` pour conserver vos pays visités et vos scores même après avoir fermé le navigateur.

---

## Stack Technique

* **Framework** : [Vue.js 3](https://vuejs.org/) (Utilisation de la Composition API et des Composables).
* **Routing** : [Vue Router](https://router.vuejs.org/) pour la navigation entre les pages.
* **API** : [RestCountries V3.1](https://restcountries.com/).
* **Build Tool** : Vite.

---

## Structure du Code

* **`src/components/`** : Composants d'interface comme `CountryCard`, `SearchBar` et `RegionFilter`.
* **`src/composable/`** : Logique métier partagée (`useFetch` pour les appels API, `useVisited` pour le stockage, `useCapitalQuiz` pour la logique du jeu).
* **`src/pages/`** : Vues principales de l'application (`HomePage`, `FlagQuizPage`, `VisitedPage`).

---

## Installation

1. **Cloner le projet** :
  ```sh
  git clone https://github.com/m-degroux/CountryQuiz.git
  ```
2. **Installer les dépendances** :
  ```sh
  npm install
  ```
3. **Lancer le serveur de développement** :
  ```sh
  npm run dev
  ```
