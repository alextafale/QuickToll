const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8081;
const  HOST = 192.168.1.104; 
// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para registrar un usuario
app.post('/signUp', async (req, res) => {
    const { nombre, apellido, correo, contrasenya,telefono } = req.body;

    try {
        // Validaciones de campos obligatorios
        if (!nombre || !apellido || !correo || !contrasenya || !telefono) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos obligatorios deben ser proporcionados.',
            });
        }

        // Validación de correo electrónico
        if (!/\S+@\S+\.\S+/.test(correo)) {
            return res.status(400).json({
                success: false,
                message: 'El formato del correo electrónico no es válido.',
            });
        }


        // Verificar si el correo ya existe
        const [existingUsers] = await pool.execute('SELECT id FROM clientes WHERE correo = ?', [correo]);

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El correo electrónico ya está registrado.',
            });
        }

        // Hashear la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasenya, saltRounds);

        // Insertar nuevo usuario
        const [result] = await pool.execute(
            `INSERT INTO clientes 
            (nombre, apellido,telefono, correo, contrasenya)
            VALUES ( ?,?, ?, ?, ?)`,
            [nombre, apellido,telefono, correo,  hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente.',
            userId: result.insertId,
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar el registro.',
            error: error.message,
        });
    }
});

app.post('/logIn', async (req, res) => {
    const {correo, contrasenya } = req.body;

    try {
        // Validaciones de campos obligatorios
        if (!correo || !contrasenya) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos obligatorios deben ser proporcionados.',
            });
        }

        // Verificar las credenciales del usuario
        const [rows] = await pool.execute('SELECT * FROM clientes WHERE correo = ?', [correo]);

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas.',
            });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(contrasenya, user.contrasenya);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso.',
            userId: user.id,
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar el inicio de sesión.',
            error: error.message,
        });
    }
});