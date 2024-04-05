import { Router } from 'express'
import { register } from '../controllers/register.controller.js'

const router = Router()

/**
 * @openapi
 * /register/user:
 *   post:
 *     tags:
 *       - Register
 *     summary: Registrar nuevo usuario.
 *     description: Endpoint para registrar un nuevo usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               email:
 *                 type: string
 *               celular:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: number
 *             required:
 *               - nombre
 *               - apellido
 *               - email
 *               - celular
 *               - password
 *               - role
 *     responses:
 *       '201':
 *         description: Usuario creado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Faltan datos o el email ya está registrado.
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
router.post('/user', register)

export default router
