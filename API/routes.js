
//API connexion:
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === testUser.email && password === testUser.password) {
        res.send('Vous êtes connectés !');
    } else {
        res.status(401).send('Email ou mot de passe incorrect');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}`);
});

//API inscription:
let testUser = [];

app.post('/inscription', (req, res) => {
    const {nom, prenom, adresseCourriel, motDePasse, confirmerMDP, nomEntreprise} = req.body;
    if (!nom || !prenom || !adresseCourriel || !motDePasse || !confirmerMDP || !nomEntreprise) {
        return res.status(400).json({success: false, message:'Veuillez remplir tous les champs!'});
    }

    if (motDePasse !== confirmerMDP) {
       return res.status(400).json({success: false, message:'Les mots de passe ne correspondent pas!'});
    }

    const userExistant = testUser.find(user => user.adresseCourriel === adresseCourriel);
    if(userExistant) {
        return res.status(400).json({success: false, message:'Adresse courriel déjà utilisée!'});

    }
    testUser.push({nom, prenom, adresseCourriel, motDePasse, nomEntreprise});
return res.status(201).json({success: true, message:'Utilisateur créé avec succès!'});
});

app.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}`);
   
});