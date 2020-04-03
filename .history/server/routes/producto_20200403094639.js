const express = require('express');

const { verificarToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');


// ===========================
// Obtener productos
// ===========================

app.get('/producto', (req, res) => {
    // traer todo los productos
    // populate: usaurio  categoria
    //paginado

});

app.get('/producto/:id', (req, res) => {

});

module.exports = app;