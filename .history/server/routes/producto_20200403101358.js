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

    Producto.find({})
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });

        });

});

// ===========================
// Obtener un producto por ID
// ===========================
app.get('/productos/:id', (req, res) => {
    // populate: usaurio  categoria

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});

// ===========================
// Crear un  nuevo producto
// ===========================
app.post('/productos', verificarToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado

    let body = req.body;

    let producto = new Producto();

    producto.nombre = body.nombre;
    producto.precioUni = body.precioUni;
    producto.descripcion = body.descripcion;
    producto.disponible = body.disponible;
    producto.categoria = body.categoria;
    producto.usuario = req.usuario._id;

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });


});

// ===========================
// ACTUALIZAR un  nuevo producto
// ===========================
app.put('/productos/:id', verificarToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let id = req.params.id;
    let body = req.body;

    let insertProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    };

    Categoria.findByIdAndUpdate(id, insertProducto, { new: true, runValidators: true }, (err, categoriaDB) => {

    });

});

// ===========================
// Borrar un  nuevo producto
// ===========================
app.delete('/productos/:id', (req, res) => {
    // 

});


module.exports = app;