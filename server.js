const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 5000;

// Middleware pour pouvoir parser le JSON dans les requêtes POST
app.use(express.json());

// Fonction pour créer un utilisateur aléatoire
const createUser = () => {
    return {
        _id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        password: faker.internet.password()
    };
};

// Fonction pour créer une entreprise aléatoire
const createCompany = () => {
    return {
        _id: faker.string.uuid(),
        name: faker.company.name(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        }
    };
};

// Route pour créer un nouvel utilisateur
app.get('/api/users/new', (req, res) => {
    const newUser = createUser();
    res.json(newUser);
});

// Route pour créer une nouvelle entreprise
app.get('/api/companies/new', (req, res) => {
    const newCompany = createCompany();
    res.json(newCompany);
});

app.get("/api/users/companies", (req, res) => {
    const newUser = createUser();
    const newCompany = createCompany();
    const responseObject = {
      user: newUser,
      company: newCompany,
    };
    res.json(responseObject);
  });
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Express Server  running on port ${port}`);
});
