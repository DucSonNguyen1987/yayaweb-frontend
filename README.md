# yayaweb-frontend

# Documentation YAYA SPICY JUICE - Application Web

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Technologies utilisées](#technologies-utilisées)
4. [Structure du projet](#structure-du-projet)
5. [Installation et configuration](#installation-et-configuration)
6. [Fonctionnalités principales](#fonctionnalités-principales)
7. [Composants](#composants)
8. [Gestion d'état](#gestion-détat)
9. [Système d'authentification](#système-dauthentification)
10. [Paiements](#paiements)
11. [Styles et UI](#styles-et-ui)
12. [API et Backend](#api-et-backend)
13. [Déploiement](#déploiement)

---

## 🎯 Vue d'ensemble

YAYA SPICY JUICE est une application e-commerce spécialisée dans la vente de jus épicés pressés à froid. L'application permet aux utilisateurs de :

- Découvrir et acheter des jus bio et épicés
- Créer leurs propres jus personnalisés avec MyJuice Creator
- Gérer leur compte et historique de commandes
- Passer commande avec livraison programmée

## 🏗️ Architecture

### Frontend
- **Framework** : Next.js 12.1.6
- **Architecture** : Pages Router
- **Rendu** : SSR/SSG avec hydration côté client
- **State Management** : Redux Toolkit avec Redux Persist

### Backend
- **API** : Backend Node.js séparé (non inclus dans ce code)
- **Base de données** : MongoDB (inférée des modèles)
- **Authentification** : JWT avec refresh tokens
- **Paiements** : Stripe Checkout

## 🛠️ Technologies utilisées

### Core
- **Next.js** 12.1.6 - Framework React
- **React** 18.1.0 - Bibliothèque UI
- **Redux Toolkit** - Gestion d'état
- **Redux Persist** - Persistance du state

### UI/UX
- **Ant Design** 5.20.0 - Composants UI
- **CSS Modules** - Styles scopés
- **FontAwesome** - Icônes
- **GSAP** 3.12.7 - Animations

### Outils
- **Axios** - Client HTTP
- **Day.js** - Manipulation de dates
- **Stripe** - Paiements
- **Jest** - Tests unitaires

## 📁 Structure du projet

```
├── components/           # Composants React réutilisables
│   ├── Header/          # En-tête avec navigation
│   ├── Footer/          # Pied de page
│   ├── shared/          # Composants partagés (Button, Banner)
│   ├── Order/           # Composants de commande
│   ├── MyJuice/         # Créateur de jus personnalisés
│   └── ...
├── pages/               # Pages Next.js
│   ├── api/            # API routes
│   ├── products/       # Pages produits
│   └── ...
├── styles/             # Styles CSS modules
├── reducers/           # Redux slices
├── api/                # Configuration API
└── public/             # Assets statiques
```

## 🚀 Installation et configuration

### Prérequis
- Node.js 16+
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone [repository-url]

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local
```

### Variables d'environnement
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Démarrage en développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3001`

## ✨ Fonctionnalités principales

### 1. **Page d'accueil** (`/`)
- Hero banner avec présentation de la marque
- Catalogue des gammes de produits
- Présentation des bénéfices des jus
- Section concept de l'entreprise

### 2. **Catalogue produits** (`/shop`, `/products/[category]`)
- Affichage des produits par catégorie
- Filtrage par gamme (Super Jus, Infusions, Spicy Shots)
- Fiches produits détaillées avec images, composition, bénéfices

### 3. **MyJuice Creator** (`/myjuice`)
- **Interface interactive** pour créer des jus personnalisés
- **Sélection d'ingrédients** : fruits, légumes, épices
- **Visualisation en temps réel** avec animation de la bouteille
- **Calcul automatique** du prix selon les ingrédients
- **Animations GSAP** pour les effets visuels (bulles, splash)

### 4. **Système d'authentification**
- Inscription/connexion utilisateur
- Gestion des profils avec adresses de livraison
- Historique des commandes
- Tokens JWT avec refresh automatique

### 5. **Panier et commande**
- Ajout/suppression d'articles
- Sélection des volumes (250ml, 1L)
- Choix de la date et créneau de livraison
- Paiement sécurisé via Stripe

### 6. **Gestion des commandes**
- Suivi du statut des commandes
- Confirmation de livraison
- Historique complet des achats

## 🧩 Composants

### Composants principaux

#### `Header` (`components/Header/Header.js`)
- Navigation principale
- Authentification (popover utilisateur)
- Panier (popover avec articles)
- Menu produits avec sous-navigation

#### `Home` (`components/Home.js`)
- Page d'accueil complète
- Hero banner avec icônes des valeurs
- Présentation de l'entreprise avec animations SVG
- Catalogue des gammes intégré

#### `MyJuiceCreator` (`components/MyJuice/Components/MyJuiceCreator.js`)
**Composant le plus complexe** avec :
- Gestion des ingrédients par catégorie
- Animation de la bouteille en temps réel
- Calcul dynamique des prix
- Animations GSAP pour les effets visuels
- Modal de configuration de commande

#### `Product` (`components/Product.js`)
- Affichage détaillé des produits
- Carrousel d'images
- Sélection des options (volume, quantité)
- Calcul des bénéfices nutritionnels
- Ajout au panier

#### `OrderSummary` (`components/Order/OrderSummary.js`)
- Récapitulatif des articles
- Calcul des totaux
- Gestion des quantités
- Interface de suppression

### Composants partagés

#### `Button` (`components/shared/Button.js`)
Bouton réutilisable avec props :
- `backgroundColor`, `color` - Couleurs personnalisées
- `fontSize`, `minWidth` - Dimensions
- `disabled` - État désactivé
- `onClick` - Gestionnaire d'événement

#### `Banner` (`components/shared/Banner.js`)
Bannière responsive pour sections promotionnelles

## 🗃️ Gestion d'état

### Redux Store
Configuration avec Redux Toolkit et persistance :

```javascript
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
```

### Slices principaux

#### `user` (`reducers/user.js`)
```javascript
const initialState = {
  value: {
    gender: null,
    firstName: null,
    lastName: null,
    email: null,
    accessToken: null,
    refreshToken: null,
    address: []
  }
};
```

Actions :
- `login` - Connexion utilisateur
- `logout` - Déconnexion
- `setAccessToken` - Mise à jour du token

#### `cart` (`reducers/cart.js`)
```javascript
const initialState = {
  value: {
    items: [],
    deliveryDate: null,
    deliveryTime: null,
    total: 0
  }
};
```

Actions :
- `addToCart` - Ajout d'article
- `removeFromCart` - Suppression
- `updateDeliveryDate/Time` - Programmation livraison

#### `myJuice` (`reducers/myJuice.js`)
Sauvegarde des recettes personnalisées créées

## 🔐 Système d'authentification

### Flux d'authentification
1. **Inscription** : Validation côté client + API
2. **Connexion** : JWT + refresh token
3. **Persistance** : Redux Persist
4. **Refresh automatique** : Intercepteur Axios

### Intercepteur API (`api/axios.js`)
```javascript
// Ajout automatique du token
api.interceptors.request.use((config) => {
  const accessToken = store.getState().user.value.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh automatique en cas d'expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      // Refresh du token
    }
  }
);
```

### Validation des formulaires
Validation complète avec regex pour :
- Email
- Mot de passe (8 caractères, majuscule, minuscule, caractère spécial)
- Téléphone (10 chiffres)
- Âge (majeur)

## 💳 Paiements

### Intégration Stripe
Configuration dans `components/Order/OrderPaymentModes.js` :

```javascript
const handlePaymentStripe = async () => {
  const orderData = {
    items: cart.items,
    customer_email: user.email,
    deliveryDate,
    deliveryTime,
    deliveryAddress,
    total: cart.total
  };
  
  const response = await api.post('/create-checkout-session', orderData);
  router.push(response.data.url);
};
```

### Flux de paiement
1. **Préparation** : Données de commande
2. **Session Stripe** : Création via API backend
3. **Redirection** : Checkout Stripe
4. **Confirmation** : Retour sur page de remerciement
5. **Webhook** : Confirmation backend

## 🎨 Styles et UI

### Système de design
Variables CSS personnalisées :
```css
:root {
  --yaya-neutral: #707070;
  --yaya-prime: #F27C00;
  --yaya-second: #04656B;
  --yaya-third: #01A281;
  --yaya-padding: 16px;
}
```

### CSS Modules
Chaque composant a son module CSS :
- `Home.module.css` - Page d'accueil
- `Product.module.css` - Pages produits
- `MyJuiceCreator.module.css` - Créateur de jus
- `Header.module.css` - Navigation

### Typographie
- **Titre** : "Concert One"
- **Texte** : "Varela Round"
- **Interface** : Ant Design defaults

### Responsive Design
Breakpoints définis :
- Mobile : 360px+
- Tablette : 768px+
- Desktop : 1024px+
- Large : 1440px+

## 🔗 API et Backend

### Configuration
Base URL configurée via variable d'environnement :
```javascript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' }
});
```

### Endpoints principaux
- `POST /users/signup` - Inscription
- `POST /users/login` - Connexion
- `GET /products` - Liste des produits
- `GET /products/product-info/:id` - Détail produit
- `GET /products/categories` - Catégories
- `GET /ingredients` - Liste des ingrédients
- `POST /order-confirm` - Confirmation commande
- `POST /create-checkout-session` - Session Stripe
- `GET /users/orders` - Historique commandes

### Gestion des erreurs
Intercepteur pour les erreurs API avec refresh automatique des tokens.

## 🚀 Déploiement

### Build de production
```bash
npm run build
npm start
```

### Variables d'environnement de production
```env
NEXT_PUBLIC_BACKEND_URL=https://api.yaya-spicyjuice.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### Optimisations
- **Images** : Composant `next/image` pour l'optimisation
- **Fonts** : Preload des polices personnalisées
- **CSS** : Modules CSS pour le scope
- **Bundle** : Optimisation automatique Next.js

## 🧪 Tests

### Configuration Jest
```javascript
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};
```

### Scripts de test
```bash
npm test        # Tests unitaires
npm run test:watch  # Mode watch
```

## 📱 Fonctionnalités avancées

### MyJuice Creator - Animations
Le composant le plus innovant avec :
- **Animations GSAP** pour les effets de liquide
- **Bulles animées** dans le liquide
- **Effet splash** lors de l'ajout d'ingrédients
- **Changement de couleur** en temps réel
- **Calcul dynamique** des prix

### Système de livraison
- **Sélection de date** avec DatePicker Ant Design
- **Créneaux horaires** disponibles
- **Validation** des disponibilités
- **Persistance** dans le panier

### Gestion des images produits
- **Carrousel** avec navigation
- **Images conditionnelles** selon les options
- **Optimisation** Next.js Image
- **Lazy loading** automatique

---

## 🔧 Maintenance et évolutions

### Monitoring
- Logs d'erreurs côté client
- Suivi des conversions e-commerce
- Performances de chargement

### Évolutions possibles
- **PWA** : Transformation en Progressive Web App
- **Notifications** : Push notifications pour les commandes
- **Géolocalisation** : Zones de livraison
- **Recommandations** : IA pour suggestions de produits
- **Chat** : Support client en temps réel

Cette documentation couvre tous les aspects de l'application YAYA SPICY JUICE. Pour toute question spécifique ou mise à jour, n'hésitez pas à consulter le code source ou à contacter l'équipe de développement.
