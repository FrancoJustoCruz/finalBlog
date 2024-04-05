import { pool } from '../config/db.js'
import { verificarPropietarioUsuario } from '../autorizar/auth.js'

export const getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId
  try {
    const [rows] = await pool.query(`
        SELECT id, user_id, post_id, contenido, fecha_creacion AS fechaCreacion, hora_creacion AS horaCreacion
        FROM comentarios WHERE post_id = ?`, [postId])

    // Verificar si hay comentarios
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No hay comentarios para este post.' })
    }

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

export const createComment = async (req, res) => {
  try {
    const { userId, contenido } = req.body
    const postId = req.params.postId // Obtener postId de los parámetros de la URL

    if (userId && contenido) {
      // Obtener la fecha y hora actual en el formato deseado
      const fechaCreacion = new Date().toISOString().split('T')[0]
      const horaCreacion = new Date().toLocaleTimeString('en-US', { hour12: false })

      await pool.execute(
        'INSERT INTO comentarios (user_id, post_id, contenido, fecha_creacion, hora_creacion) VALUES (?, ?, ?, ?, ?)',
        [userId, postId, contenido, fechaCreacion, horaCreacion]
      )

      res.status(201).json({ message: 'Comentario creado exitosamente.' })
    } else {
      res.status(400).json({ message: 'Faltan datos requeridos para crear el comentario.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
export const updateComment = async (req, res) => {
  const { postId, commentId } = req.params
  const { contenido } = req.body
  const userId = req.user.id
  const userEmail = req.user.email
  const userPassword = req.user.password

  try {
    const isOwner = await verificarPropietarioUsuario(userId, userEmail, userPassword)
    if (!isOwner) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar este comentario.' })
    }

    const [comment] = await pool.execute('SELECT user_id FROM comentarios WHERE id = ?', [commentId])
    if (comment.length === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado.' })
    }

    const commentUserId = comment[0].user_id

    if (userId !== commentUserId) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar este comentario.' })
    }

    const [result] = await pool.execute('UPDATE comentarios SET contenido = ? WHERE id = ? AND post_id = ?', [contenido, commentId, postId])
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Comentario actualizado.' })
    } else {
      res.status(404).json({ message: 'Comentario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params
  const userId = req.user.id // Obtener el ID del usuario autenticado desde el objeto req.user

  try {
    // Verificar si el usuario autenticado es el propietario del comentario
    const [comment] = await pool.execute('SELECT user_id FROM comentarios WHERE id = ? AND post_id = ?', [commentId, postId])
    if (comment.length === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado.' })
    }

    const commentUserId = comment[0].user_id
    if (userId !== commentUserId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario.' })
    }

    // Eliminar el comentario
    const [result] = await pool.execute('DELETE FROM comentarios WHERE id = ? AND post_id = ?', [commentId, postId])

    // Verificar si se eliminó el comentario
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Comentario eliminado exitosamente.' })
    } else {
      res.status(404).json({ message: 'Comentario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
