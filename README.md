
# SCRIPT D'IMPORT DES DONNÉES D'ARCHIVES

## Table des matières

- [Introduction](#introduction)
- [Technologie utilisée](#technologie-utilisée)
- [Les composants](#les-composants)
- [L'architecture](#larchitecture)
- [Le flow](#le-flow)
- [L’exploitation des logs](#lexploitation-des-logs)

## Introduction
Ce script permet d'importer les données telles que :
- Les règles de communicabilité
- Les profils d'archives
- Les accords de versement

## Technologie utilisée
Le script se base sur Node.js et utilise les packages suivants :

## Les composants
- `"axios": "^1.6.8"` : pour les appels HTTP
- `"dotenv": "^16.4.5"` : pour les variables d'environnement
- `"npm": "^10.5.2"` : pour la gestion des packages
- `"xlsx": "^0.18.5"` et `"xml2js": "^0.6.2"` : pour la lecture des fichiers XLS
- "Dossier scripts": contenant des scripts pour la lecture et le traitement 

## Le flow
1. Cloner le projet avec la commande :
   ```sh
   git clone git@gitlab.com:axone2/maarchrm/maarchrmap-scripts.git
   ```

2. Installer les packages :
   ```shell
   cd vmaarchrmap-scripts
   npm install
   ```
3. Configuration

- Créer un compte de service et gener un token:
   ```sh
   cp .env.example .env
   ```
- mettez a jour les variables d'env'

4. Lancer le script :
   ```shell
   node app.js
   ```

## L’exploitation des logs
Une fois le script lancé, des logs des appels seront affichés dans le terminal.

---

N'hésitez pas à ajouter des détails spécifiques à votre projet si nécessaire, comme des informations sur la configuration des variables d'environnement dans le fichier `.env`, ou des détails sur les fichiers d'entrée attendus.