const express = require("express");

let { verificarToken, verificarAdmin_Role } = require("../middlewares/autenticacion");

let app = express();

let Categoria = require("../models/categoria");

// ===========================
// MOSTRAR TODA LAS CATEGORIAS
// ===========================
app.get('/categoria', verificarToken, (req, res) => {

    /*Categoria.find((err, categorias) => {

    });*/

});

// ===========================
// MOSTRAR UNA CATEGORIA POR ID
// ===========================
app.get('/categoria/:id', (req, res) => {

});

// ===========================
// CREAR NUEVA CATEGORIA
// ===========================
app.post('/categoria', [verificarToken, verificarAdmin_Role], (req, res) => {

    let body = req.body;

    //    usuario: req.usuario._id

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});

module.exports = app;