"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
let listado = [];
const guardarBD = () => {
    let data = JSON.stringify(listado);
    fs.writeFile('./dist/api/db/data.json', data, (error) => {
        if (error) {
            console.log(`No se pudo grabar ${error}`);
        }
    });
};
const cargarBD = () => {
    try {
        listado = require('./../db/data.json');
    }
    catch (error) {
        listado = [];
        console.log(error);
    }
    return listado;
};
const crearTarea = (descripcionEntrada) => {
    cargarBD();
    let porHacer = {
        descripcion: descripcionEntrada,
        completado: false
    };
    listado.data.push(porHacer);
    guardarBD();
    return listado.data;
};
const actualizarTarea = (descripcion) => {
    cargarBD();
    let index = listado.data.findIndex((tarea) => {
        tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listado.data[index].completado = true;
        guardarBD();
        return true;
    }
    else {
        return false;
    }
};
exports.controlador = {
    traerTodos: (req, res) => {
        res.json(cargarBD());
    },
    crear: (req, res) => {
        let descripcion = req.body.descripcion;
        // let {descripcion} = req.body; ES6
        crearTarea(descripcion);
        res.send('Se agrego a la lista de tareas');
    },
    actualizar: (req, res) => {
        let { descripcion } = req.body;
        if (actualizarTarea(descripcion)) {
            res.send('Se actualizo la tarea');
        }
        else {
            res.send('No se encontro la tarea');
        }
    }
};
