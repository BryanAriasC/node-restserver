const express = require('express');

const { verificarToken } = require('../middlewares/autenticacion');

let app = express();