"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// var bodyParser = require('body-parser')
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    /**
     * Este es el constructor - comando 'ctor'
     */
    constructor() {
        this.app = express_1.default();
        this.configureCORS();
        this.puerto = process.env.PORT || 3000;
        this.configureBodyParser();
        this.routes();
    }
    configureCORS() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // sitios desde donde se puede hacer solicitudes
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT'); // metodos para hacer solicitudes al backend
            res.header('Allow', 'GET, POST, DELETE, PUT'); // metodos para hacer solicitudes al backend
            next();
        });
    }
    // formas de mandar data al servidor
    configureBodyParser() {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
    }
    // configurando rutas de la API
    routes() {
        this.app.get('/', (req, res) => {
            res.status(200).send('La API FUNCIONA');
            // res.send('La API funciona!'); // status:200
        });
    }
    // iniciando el servidor 
    start() {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor corriendo exitosamente en el puerto ${this.puerto}`);
        });
    }
}
exports.Server = Server;
