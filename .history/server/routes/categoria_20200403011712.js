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

// ===========================
// ACTUALIZAR UNA CATEGORIA
// ===========================
app.put('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

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


// ===========================
// ELIMINAR UNA CATEGORIA
// ===========================
app.delete('/categoria/:id', [verificarToken, verificarAdmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El id no existe"
                }
            });
        }

        res.json({
            ok: true,
            message: 'categoria Borrada'
        });

    });

});

module.exports = app;