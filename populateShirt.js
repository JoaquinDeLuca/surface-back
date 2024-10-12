require('dotenv').config();
require('./config/dataBase'); // Conexión a la base de datos

const Shirt = require('./models/Shirt'); // Importa el modelo Shirt

// Array de 10 objetos de "remeras de egresados" con nombres ficticios y descripciones más genéricas
const shirts = [
    {
        name: "Eclipse",
        collarShirt: false,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/71KpMZSk-KL._AC_UX679_.jpg",
        price: 1200,
        stock: 50,
        type: "shirt"
    },
    {
        name: "Nova",
        collarShirt: false,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/81fdCI4+h9L._AC_UX679_.jpg",
        price: 1300,
        stock: 45,
        type: "shirt"
    },
    {
        name: "Stellar",
        collarShirt: true,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/71zB1xCNeEL._AC_UX679_.jpg",
        price: 1400,
        stock: 40,
        type: "chomba"
    },
    {
        name: "Lunar",
        collarShirt: false,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/71HlAUCyZZL._AC_UX679_.jpg",
        price: 1250,
        stock: 60,
        type: "shirt"
    },
    {
        name: "Orion",
        collarShirt: true,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/71Zz8Z+96TL._AC_UX679_.jpg",
        price: 1500,
        stock: 30,
        type: "chomba"
    },
    {
        name: "Meteor",
        collarShirt: false,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/81rxP7am+FL._AC_UX679_.jpg",
        price: 1100,
        stock: 70,
        type: "shirt"
    },
    {
        name: "Vortex",
        collarShirt: true,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/61OM2LK-5zL._AC_UX679_.jpg",
        price: 1350,
        stock: 55,
        type: "chomba"
    },
    {
        name: "Nebula",
        collarShirt: false,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/71-YRyqxbmL._AC_UX679_.jpg",
        price: 1000,
        stock: 75,
        type: "shirt"
    },
    {
        name: "Comet",
        collarShirt: true,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/51CmQ7U-bzL._AC_UX679_.jpg",
        price: 1450,
        stock: 35,
        type: "chomba"
    },
    {
        name: "Quasar",
        collarShirt: false,
        description: "Esta es la descripción de las remeras.",
        photo: "https://m.media-amazon.com/images/I/81m8AP-2O5L._AC_UX679_.jpg",
        price: 1050,
        stock: 65,
        type: "shirt"
    }
];

// Función para poblar la base de datos con las remeras
Shirt.insertMany(shirts)
    .then(() => {
        console.log('Successfully populated the database with 10 shirts.');
        process.exit();
    })
    .catch(error => {
        console.log('Error populating the database:', error);
        process.exit(1);
    });
