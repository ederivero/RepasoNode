"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlador_1 = require("./../controllers/controlador");
const express_1 = require("express");
exports.rutas_router = express_1.Router();
exports.rutas_router.get('/data/traer', controlador_1.controlador.traerTodos);
exports.rutas_router.post('/data/crear', controlador_1.controlador.crear);
exports.rutas_router.put('/data/actualizar', controlador_1.controlador.actualizar);
