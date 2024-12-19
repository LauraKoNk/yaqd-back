// Importation du module Express pour créer l'application web
const express = require('express');

// Importation de Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

//fichier env
require('dotenv').config();


//Appel des routes
const animationRoutes = require('./routes/animation');
const chaineRoutes = require('./routes/chaine');
const diffusionRoutes = require('./routes/diffusion');
const userRoutes = require('./routes/user');

// Création de l'application Express
const app = express();

// Connexion à la base de données MongoDB avec les paramètres de connexion
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true, // Option pour utiliser l'analyseur de chaînes de connexion plus récent
        useUnifiedTopology: true // Option pour gérer les connexions de manière unifiée
    })
    .then(() => console.log('Connexion à MongoDB réussie !')) // Confirmation en cas de succès
    .catch(err => console.error('Erreur de connexion à MongoDB :', err)); // Message d'erreur en cas d'échec

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Middleware pour configurer les en-têtes CORS (autorisation d'accès entre domaines)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise les requêtes depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Spécifie les en-têtes autorisés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Définit les méthodes HTTP autorisées
    next(); // Passe à la prochaine étape du middleware
});

app.use('/api/animation', animationRoutes);
app.use('/api/chaine', chaineRoutes);
app.use('/api/diffusion', diffusionRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'application pour l'utiliser dans d'autres fichiers
module.exports = app;
