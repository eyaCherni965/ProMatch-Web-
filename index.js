const express = require("express");
const app = express();
const path = require("path");
const pathRoutes = require("./routes/path");
const session = require("express-session");
const jwt = require('jsonwebtoken');
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

// Lancer le serveur
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur écoute sur http://localhost:${PORT}`);
});
