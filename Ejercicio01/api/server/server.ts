import express from 'express';
import { Response, Request, NextFunction } from 'express';
// var bodyParser = require('body-parser')
import bodyParser from 'body-parser';
import { rutas_router } from '../routes/rutas';

export class Server {
    public app: express.Application;
    public puerto: any;
    public conexion: any;
    /**
     * Este es el constructor - comando 'ctor'
     */
    constructor() {
        this.app = express();
        this.configureCORS();
        this.puerto = process.env.PORT || 3000;
        this.configureBodyParser();
        this.routes();
    }
    configureCORS() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*'); // sitios desde donde se puede hacer solicitudes
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT'); // metodos para hacer solicitudes al backend
            res.header('Allow', 'GET, POST, DELETE, PUT'); // metodos para hacer solicitudes al backend
            next();
        });
    }

    // formas de mandar data al servidor
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    // configurando rutas de la API
    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).send('La API FUNCIONA');
            // res.send('La API funciona!'); // status:200
        });
        this.app.use('/api',rutas_router);
    }

    // iniciando el servidor 
    start() {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor corriendo exitosamente en el puerto ${this.puerto}`);
        });
    }

}