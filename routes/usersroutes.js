const express = require('express');
const router = express.Router();
const userModel = require('../models/userModels');

router.post('/register', async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(201).json({
            success: true,
            msg: "usuario registrado exitosamente",
            token: user.ObtenerJWT()
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Si no llega email o password
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Debe ingresar email o password",
            token: user.ObtenerJWT()
        });
    } else {
        try {
            // Encontrar el usuario por email
            const user = await userModel.findOne({ email }).select("+password");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontró el usuario',
                });
            } else {
                // Utilizar el método para comparar contraseñas
                const isMatch = await user.comparePassword(password);

                if (!isMatch) {
                    res.status(400).json({
                        success: false,
                        msg: "Contraseña incorrecta",
                    });
                } else {
                    res.status(200).json({
                        msg: "Login correcto",
                    });
                }
            }
        } catch (error) {
            // Handle other errors (e.g., database errors)
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Error en el servidor",
            });
        }
    }
});   

module.exports = router