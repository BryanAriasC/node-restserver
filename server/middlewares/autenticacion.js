const jwt = require('jsonwebtoken');

//=================
// Verificar TOKEN
//=================

let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        console.log(decoded);

        req.usuario = decoded.usuario;

        next();

    });

}

//=================
// Verificar AdminRole
//=================

let verificarAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });

    }


}


module.exports = {
    verificarToken,
    verificarAdmin_Role
}