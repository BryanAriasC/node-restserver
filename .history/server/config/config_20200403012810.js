//=================
// Puerto
//=================

process.env.PORT = process.env.PORT || 3000;


//=================
// Entorno
//=================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=================
// Vencimiento del Token
//=================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
//process.env.CADUCIDAD_TOKE = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKE = '48h';

//=================
// SEED de autenticacion
//=================
process.env.SEED = process.env.SEED | 'este-es-el-SEED-desarrollo';

let urlDB;
if (process.env.NODE_ENV == 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//=================
// Google Client ID
//=================
process.env.CLIENT_ID = process.env.CLIENT_ID || '829267200622-bslur0n2rkc70q332bl9f6tjt9lrnlk7.apps.googleusercontent.com';