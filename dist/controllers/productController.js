"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProducts = void 0;
const db_1 = require("../db");
const getProducts = async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM products');
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getProducts = getProducts;
const addProduct = async (req, res) => {
    const { name, sku, category, description, price, stock, minStock, maxStock, supplierId, unit, location } = req.body;
    try {
        const [result] = await db_1.pool.query('INSERT INTO products (name, sku, category, description, price, stock, minStock, maxStock, supplierId, unit, location, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())', [name, sku, category, description, price, stock, minStock, maxStock, supplierId, unit, location]);
        const insertedId = result.insertId;
        const [rows] = await db_1.pool.query('SELECT * FROM products WHERE id = ?', [insertedId]);
        if (Array.isArray(rows) && rows.length > 0) {
            res.status(201).json(rows[0]);
        }
        else {
            res.status(201).json(null);
        }
    }
    catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.addProduct = addProduct;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        await db_1.pool.query('UPDATE products SET ? , updatedAt = NOW() WHERE id = ?', [updates, id]);
        const [rows] = await db_1.pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (Array.isArray(rows) && rows.length > 0) {
            res.json(rows[0]);
        }
        else {
            res.json(null);
        }
    }
    catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db_1.pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Producto eliminado' });
    }
    catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.deleteProduct = deleteProduct;
// Aquí se pueden agregar más funciones para actualizar y eliminar productos
