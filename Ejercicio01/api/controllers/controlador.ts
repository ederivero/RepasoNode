import { Request, Response } from 'express';
const fs = require('fs');
let listado: any = [];

const guardarBD = () => {
    let data = JSON.stringify(listado);

    fs.writeFile('./dist/api/db/data.json', data, (error: any) => {
        if (error) {
            console.log(`No se pudo grabar ${error}`);
        }
    });
}
const cargarBD = () => {
    try {
        listado = require('./../db/data.json');
    } catch (error) {
        listado = [];
        console.log(error);
    }
    return listado;
}
const crearTarea = (descripcionEntrada: any) => {
    cargarBD();
    let porHacer = {
        descripcion: descripcionEntrada,
        completado: false
    };
    listado.data.push(porHacer);
    guardarBD();
    return listado.data;
}
const actualizarTarea = (descripcion: any) => {
    cargarBD();
    let index = listado.data.findIndex(
        (tarea: any) => tarea.descripcion === descripcion);
    if (index >= 0) {
        listado.data[index].completado = true;
        guardarBD();
        return true;
    } else {
        return false;
    }
}

export var controlador = {
    traerTodos: (req: Request, res: Response) => {
        res.json(cargarBD());
    },
    crear: (req: Request, res: Response) => {
        let descripcion = req.body.descripcion;
        // let {descripcion} = req.body; ES6
        crearTarea(descripcion);
        // MUESTRE LAS TAREAS
        res.send('Se agrego a la lista de tareas');
    },
    actualizar: (req: Request, res: Response) => {
        let { descripcion } = req.body;
        if (actualizarTarea(descripcion)) {
            // muestre todas las tareas 
            res.send('Se actualizo la tarea')
        }
        else {

            res.send('No se encontro la tarea')
        }
    }
}