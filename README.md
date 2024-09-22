# Koliseum Academy Front-End

Ce dépôt est dédié au frontend de l'application Koliseum Academy, une plateforme innovante de gestion d'entraînement pour les sports de combat, offrant une expérience personnalisée pour les utilisateurs, similaire à Doctolib. Le projet utilise React et Tailwind CSS pour une interface utilisateur moderne, rapide et responsive.

## Commencer

Ces instructions vous guideront pour obtenir une copie du projet et le faire fonctionner sur votre machine locale pour le développement ou les tests.

### Prérequis

Pour exécuter ce projet, vous aurez besoin de **Node.js** et **npm** installés sur votre machine. Visitez [nodejs.org](https://nodejs.org/) pour télécharger et installer ces outils.

### Installation

Après avoir cloné le dépôt avec `git clone`, suivez ces étapes pour installer les dépendances et exécuter le projet.

1. Installez les dépendances NPM :

    ```bash
    npm install
    ```

2. Lancez le serveur de développement :

    ```bash
    npm run start
    ```

3. Si voulez deployer

    ```bash
    npm run build
    ```

## Architecture du projet

L'application Koliseum Academy Front-End suit une architecture modulaire, centrée autour de React avec une utilisation efficace de Recoil pour la gestion de l'état global et Tailwind CSS pour le style. Voici un aperçu des principales parties du projet :

### Pages

Le répertoire pages contient les différentes pages de l'application, organisées en fonction des différentes sections, telles que les profils utilisateur, les détails des cours, la page d'accueil, etc. Chaque page est un composant React complet qui rend les informations spécifiques à la section associée.

Exemple : pages/Home.tsx, pages/user/Profil.tsx, pages/cours/CoursDetail.tsx

### Composants

Le répertoire components contient des composants réutilisables, comme la barre de navigation (Navbar), les formulaires (Form), et d'autres éléments d'interface utilisateur. Ces composants sont conçus pour être facilement intégrés dans les différentes pages de l'application.

Exemple : components/header/Navbar.tsx, components/form/CreationCoursForm.tsx

### Hooks

Le répertoire hooks contient des hooks personnalisés comme useAuth pour gérer l'authentification des utilisateurs ou useApiCourse pour interagir avec l'API de gestion des cours. Ces hooks facilitent la réutilisation de la logique à travers l'application.

Exemple : hooks/useAuth.ts, hooks/useApiCours.ts

### Atoms

La gestion de l'état global est réalisée avec Recoil. Le répertoire utils/atom contient les atomes qui représentent l'état partagé entre les composants, comme les informations de l'utilisateur connecté ou la sélection des sports.

Exemple : utils/atom/userAtom.ts

### Styles

Le projet utilise Tailwind CSS pour un style rapide et réactif. Les classes Tailwind sont utilisées directement dans les composants pour appliquer les styles dynamiquement. Cela permet une gestion simplifiée du style sans nécessiter de fichiers CSS externes.

### Routes

Le routage est géré avec react-router-dom. Le fichier principal App.tsx configure les différentes routes de l'application, en associant chaque route à une page spécifique. Une route 404 est également incluse pour gérer les pages non trouvées.

Exemple : App.tsx contient la configuration des routes pour les pages comme /profil, /sports, /connexion, etc.

### Utilisation

Une fois que l'application est en cours d'exécution, vous pouvez y accéder localement à l'adresse suivante :

    ```bash
    http://localhost:3000
    ```

### Auteurs

-   **Lucas Perez**
-   **Hugo Raoult**
-   **Damien Forafo**

Ces contributeurs ont apporté leur passion et leur expertise à l'élaboration de Koliseum Academy.

Ce front-end fait partie du projet Koliseum Academy, qui inclut également une API back-end accessible dans le dépôt [Koliseum Academy Back-End](https://github.com/IPtitLu/koliseum-academy).
