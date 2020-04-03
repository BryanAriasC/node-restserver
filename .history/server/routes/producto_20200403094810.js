const express = require('express');

const { verificarToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');


// ===========================
// Obtener productos
// ===========================
app.get('/productos', (req, res) => {
    // traer todo los productos
    // populate: usaurio  categoria
    //paginado

});

// ===========================
// Obtener un producto por ID
// ===========================
app.get('/productos/:id', (req, res) => {
    // populate: usaurio  categoria

});

// ===========================
// Crear un  nuevo producto
// ===========================
app.post('/productos', (req, res) => {
    // populate: usaurio  categoria

});

module.exports = app;