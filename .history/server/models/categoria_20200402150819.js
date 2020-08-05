const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'La contraseña es obligatoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});