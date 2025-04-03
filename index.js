const express = require("express");
const app = express();
const path = require("path");
const pathRoutes = require("./routes/path");
const session = require("express-session");
const jwt = require('jsonwebtoken');
const etudiantRoutes = require('./routes/etudiant');
const PORT = 8080;


// Gestion de session
app.use(
  session({
    secret: "sessionProTCH099",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Middleware pour la gestion avec JWT (POUR ANDROID SI IL Y A DES ERREURS SEE HERE FIRST)
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou mal formé.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'ta_clef_secrete_super_secure');
    req.etudiant = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

// Middleware pour parser les formulaires HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Dossier des fichiers statiques (HTML, CSS...)
app.use(express.static(path.join(__dirname, "codeInitial")));

// Routes
app.use("/", pathRoutes);

app.get("/", (res) => {
  res.send("Bienvenue sur le serveur Express !");
});

<<<<<<< Updated upstream
const PORT = 3008;
=======
// Lancer le serveur
>>>>>>> Stashed changes
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur écoute sur http://localhost:${PORT}`);
});
