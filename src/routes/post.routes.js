import { Router } from 'express'
import { getPostById, createPost, updatePost, deletePost, addCategoriesToPost, getPostsByCategory, getPostsByTitle } from '../controllers/post.controller.js'
import { authenticateUser } from '../autorizar/auth.js'

const router = Router()

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Obtener un post por su ID.
 *     description: Endpoint para obtener un post por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del post.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Publicación encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Publicación no encontrada.
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
 *   put:
 *     tags:
 *       - Posts
 *     summary: Actualizar un post.
 *     description: Endpoint para actualizar un post existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del post.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostUpdate'
 *     responses:
 *       '200':
 *         description: Publicación actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '403':
 *         description: No tienes permiso para actualizar esta publicación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Publicación no encontrada.
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
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Eliminar un post.
 *     description: Endpoint para eliminar un post existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del post.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Publicación eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '403':
 *         description: No tienes permiso para eliminar esta publicación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Publicación no encontrada.
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
router.get('/:id', getPostById)
router.post('/', createPost)
router.put('/:id', authenticateUser, updatePost)
router.delete('/:id', authenticateUser, deletePost)

/**
 * @openapi
 * /posts/{id}/categories:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Agregar categorías a un post.
 *     description: Endpoint para agregar categorías a un post existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del post.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Categorías agregadas al post exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: El post no existe.
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
router.post('/:id/categories', addCategoriesToPost)

/**
 * @openapi
 * /posts/categories/{categoryId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Obtener publicaciones por categoría.
 *     description: Endpoint para obtener publicaciones por una categoría específica.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         description: ID de la categoría.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Publicaciones encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
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
router.get('/categories/:categoryId', getPostsByCategory)

/**
 * @openapi
 * /posts/search:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Buscar publicaciones por título.
 *     description: Endpoint para buscar publicaciones por título.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Publicaciones encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '404':
 *         description: No se encontraron publicaciones que coincidan con el título proporcionado.
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
router.post('/search', getPostsByTitle)

export default router
