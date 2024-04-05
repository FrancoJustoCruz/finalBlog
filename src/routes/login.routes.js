import { Router } from 'express'
import { login } from '../controllers/login.controller.js'

const router = Router()

/**
 * @openapi
 * /login/usuario:
 *   post:
 *     tags:
 *       - Login
 *     summary: Iniciar sesión.
 *     description: Endpoint para iniciar sesión con un usuario existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso.
 *                 role:
 *                   type: string
 *       '401':
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error interno.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/usuario', login)

export default router
