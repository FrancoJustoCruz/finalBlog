import { Router } from 'express'
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js'

const router = Router()

/**
 * @openapi
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Obtener todas las categorías.
 *     description: Endpoint para obtener todas las categorías disponibles.
 *     responses:
 *       '200':
 *         description: Categorías encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
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
router.get('/', getCategories)

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Obtener una categoría por su ID.
 *     description: Endpoint para obtener una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la categoría.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoría encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Categoría no encontrada.
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
router.get('/:id', getCategoryById)

/**
 * @openapi
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Crear una nueva categoría.
 *     description: Endpoint para crear una nueva categoría.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       '201':
 *         description: Categoría creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '403':
 *         description: Acceso no autorizado. Se requieren permisos de administrador.
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
router.post('/', createCategory)

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Actualizar una categoría por su ID.
 *     description: Endpoint para actualizar una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la categoría.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       '200':
 *         description: Categoría actualizada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '403':
 *         description: Acceso no autorizado. Se requieren permisos de administrador.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Categoría no encontrada.
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
router.put('/:id', updateCategory)

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Eliminar una categoría por su ID.
 *     description: Endpoint para eliminar una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la categoría.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthData'
 *     responses:
 *       '200':
 *         description: Categoría eliminada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '403':
 *         description: Acceso no autorizado. Se requieren permisos de administrador.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Categoría no encontrada.
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
router.delete('/:id', deleteCategory)

export default router
