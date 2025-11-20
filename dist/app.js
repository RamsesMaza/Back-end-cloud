"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// El puerto solo sirve para local, Azure lo ignora
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Test route
app.get('/', (req, res) => {
    res.send('API backend bd_disearqui funcionando');
});
// Example endpoint: obtener productos
app.get('/products', async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM products');
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Rutas
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
if (!process.env.AZURE_FUNCTIONS_WORKER_RUNTIME) {
    app.listen(port, () => {
        console.log(`Servidor backend escuchando en http://localhost:${port}`);
    });
}
exports.default = app;
