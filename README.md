# BFF_Project_Service

## 🏗️ Backend for Frontend (BFF) du projet *service*

Ce dépôt contient le **BFF (Backend for Frontend)** du projet *service*.  
Il sert d’interface entre le frontend et les microservices du domaine *service*.

---

## ✨ Fonctionnalités

- Serveur basé sur **Express.js**
- Développement en **TypeScript** pour une meilleure sécurité et expérience
- Gestion des variables d’environnement avec **dotenv**
- Route de vérification de santé (health check) intégrée
- Support **Docker** pour la conteneurisation
- Gestion basique des erreurs

---

## ⚠️ Important

Avant de lancer l’application, pensez à définir la variable d’environnement `PORT`.

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

PORT=3000

# Construire l'image Docker
docker build -t bff_project_service .

# Lancer le conteneur
docker run -p 3000:3000 --env-file .env bff_project_service
markdown
Copier le code


