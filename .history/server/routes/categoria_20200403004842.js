const express = require("express");

let { verificarToken } = require("../middlewares/autenticacion");

let app = express();

let Categoria = require("../models/categoria");

// ===========================
// MOSTRAR TODA LAS CATEGORIAS
// ===========================
app.get('/categoria', verificarToken, (req, res) => {



});

// ===========================
// MOSTRAR UNA CATEGORIA POR ID
// ===========================
app.get('/categoria/:id', (req, res) => {

});

// ===========================
// CREAR NUEVA CATEGORIA
// ===========================
app.post('/categoria', (req, res) => {

});

module.exports = app;