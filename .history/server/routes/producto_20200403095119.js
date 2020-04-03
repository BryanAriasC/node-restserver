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

    Producto.find({}).
    exec((err, categorias) => {

    });

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
    // grabar el usuario
    // grabar una categoria del listado

});

// ===========================
// ACTUALIZAR un  nuevo producto
// ===========================
app.put('/productos/:id', (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado

});

// ===========================
// Borrar un  nuevo producto
// ===========================
app.delete('/productos/:id', (req, res) => {
    // 

});


module.exports = app;