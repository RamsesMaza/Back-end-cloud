"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ¡AQUÍ ESTÁ EL TRUCO!
// No pegues el texto "db-final..." aquí. 
// Usa process.env.DB_HOST para que Azure inyecte el valor automáticamente.
exports.pool = promise_1.default.createPool({
    host: process.env.DB_HOST, // <--- Azure rellenará esto con lo que pusiste en el Lugar 1
    user: process.env.DB_USER, // <--- Azure pondrá 'Mikuy'
    password: process.env.DB_PASS, // <--- Azure pondrá tu contraseña
    database: process.env.DB_NAME,
    port: 3306,
    ssl: {
        rejectUnauthorized: false // Obligatorio para Azure MySQL
    }
});
