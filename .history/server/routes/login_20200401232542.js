const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: true,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKE })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });


});


//Configuracion de Google
async function verify(token) {

    //console.log(token);
    //console.log(process.env.CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });

    //console.log(ticket);

    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };

}
//verify().catch(console.error);



app.post('/google', async(req, res) => {

    //let body = req.body;
    //console.log(body);
    //return;

    let token = req.body.idtoken;


    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: true,
                err: e
            });
        });

    return res.json({
        usuario: googleUser
    });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

    });

    /*Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (usuarioDB) {
            if (usuarioDB.google == false) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: "Debe de usar su autenticacion Normal"
                    }
                });
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, procees.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKE });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });
            }
        } else {
            // SI EL USUARIO NO EXISTE EN DB
            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = '=D';

            usuario.save((err, usuarioDB) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, procees.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKE });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });

            });
        }

    });*/


    /*res.json({
        usuario: googleUser
    });*/

});


module.exports = app;