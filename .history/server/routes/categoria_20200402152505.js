const express = require("express");

let { verificaToken } = require("../middlewares/autenticacion");

let app = express();

let Categoria = require("../models/categoria");