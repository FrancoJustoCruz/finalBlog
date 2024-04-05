import express from 'express'
import { getCommentsByPostId, createComment, updateComment, deleteComment } from '../controllers/comment.controller.js'
import { authenticateUser } from '../autorizar/auth.js'

const router = express.Router()

/**
 * @openapi
 * /posts/{postId}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Obtener comentarios por ID de publicación.
 *     description: Endpoint para obtener todos los comentarios asociados a una publicación por su ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         description: ID de la publicación.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comentarios encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       '404':
 *         description: No hay comentarios para esta publicación.
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
router.get('/:postId/comments', getCommentsByPostId)

/**
 * @openapi
 * /posts/{postId}/comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Crear un nuevo comentario.
 *     description: Endpoint para crear un nuevo comentario asociado a una publicación.
 *     parameters:
 *       - in: path
 *         name: postId
 *         description: ID de la publicación.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewComment'
 *     responses:
 *       '201':
 *         description: Comentario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Faltan datos requeridos para crear el comentario.
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
router.post('/:postId/comments', createComment)

/**
 * @openapi
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Actualizar un comentario por su ID.
 *     description: Endpoint para actualizar un comentario asociado a una publicación por su ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         description: ID de la publicación.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         description: ID del comentario.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateComment'
 *     responses:
 *       '200':
 *         description: Comentario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '403':
 *         description: No tienes permiso para actualizar este comentario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Comentario no encontrado.
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
router.put('/:postId/comments/:commentId', authenticateUser, updateComment)

/**
 * @openapi
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Eliminar un comentario por su ID.
 *     description: Endpoint para eliminar un comentario asociado a una publicación por su ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         description: ID de la publicación.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         description: ID del comentario.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comentario eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '403':
 *         description: No tienes permiso para eliminar este comentario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Comentario no encontrado.
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
router.delete('/:postId/comments/:commentId', authenticateUser, deleteComment)

export default router
