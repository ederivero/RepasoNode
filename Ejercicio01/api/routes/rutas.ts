import { controlador } from './../controllers/controlador'
import {Router} from 'express';
export var rutas_router = Router();
rutas_router.get('/data/traer',controlador.traerTodos);
rutas_router.post('/data/crear',controlador.crear);
rutas_router.put('/data/actualizar',controlador.actualizar);