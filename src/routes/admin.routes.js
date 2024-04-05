import { Router } from 'express'
import { getUsers, getUserById } from '../controllers/admin.controller.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         email:
 *           type: string
 *         celular:
 *           type: string
 *         role_id:
 *           type: number
 */

/**
 * @openapi
 * /admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Obtener todos los usuarios.
 *     description: Endpoint para obtener todos los usuarios.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', getUsers)

/**
 * @openapi
 * /admin/users/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Obtener usuario por ID.
 *     description: Endpoint para obtener un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Usuario no encontrado.
 */
router.get('/users/:id', getUserById)

export default router
