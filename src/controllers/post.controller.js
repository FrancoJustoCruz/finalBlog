import { pool } from '../config/db.js'
import { verificarPropietarioUsuario } from '../autorizar/auth.js'

export const createPost = async (req, res) => {
  try {
    const { userId, titulo, contenido } = req.body

    const fechaCreacion = new Date().toISOString().split('T')[0]
    const horaCreacion = new Date().toLocaleTimeString('en-US', { hour12: false })

    await pool.execute(
      'INSERT INTO posts (user_id, titulo, contenido, fecha_creacion, hora_creacion) VALUES (?, ?, ?, ?, ?)',
      [userId, titulo, contenido, fechaCreacion, horaCreacion]
    )

    res.status(201).json({ message: 'Publicación creada exitosamente.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

export const updatePost = async (req, res) => {
  const postId = req.params.id
  const { titulo, contenido } = req.body
  const userId = req.user.id
  const userEmail = req.user.email
  const userPassword = req.user.password // Asegúrate de que el objeto req.user contenga la contraseña

  try {
    const isOwner = await verificarPropietarioUsuario(userId, userEmail, userPassword)
    if (!isOwner) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar esta publicación.' })
    }

    const [result] = await pool.execute('UPDATE posts SET titulo = ?, contenido = ? WHERE id = ?', [titulo, contenido, postId])

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Publicación actualizada exitosamente.' })
    } else {
      res.status(404).json({ message: 'Publicación no encontrada.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

export const deletePost = async (req, res) => {
  const postId = req.params.id
  const { email, password } = req.body

  try {
    // Autenticar al usuario para verificar sus credenciales
    const [user] = await pool.query('SELECT * FROM users WHERE email=? AND password=?', [email, password])

    // Verificar si el usuario está autenticado
    if (user.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Verificar si el usuario es el propietario del post que desea eliminar
    const isOwner = await verificarPropietarioUsuario(user[0].id, email, password)
    if (!isOwner) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación.' })
    }

    // Eliminar los comentarios asociados al post
    await pool.execute('DELETE FROM comentarios WHERE post_id = ?', [postId])

    // Eliminar las relaciones entre el post y las categorías en la tabla post_categorias
    await pool.execute('DELETE FROM post_categorias WHERE post_id = ?', [postId])

    // Finalmente, eliminar el post
    const [result] = await pool.execute('DELETE FROM posts WHERE id = ?', [postId])

    // Verificar si se eliminó el post
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Publicación eliminada exitosamente.' })
    } else {
      res.status(404).json({ message: 'Publicación no encontrada.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
export const getPosts = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.titulo, p.contenido, p.fecha_creacion AS fechaCreacion, p.hora_creacion AS horaCreacion
      FROM posts p
      ORDER BY p.fecha_creacion DESC, p.hora_creacion DESC
    `)

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id

    const [rows] = await pool.query(`
      SELECT p.id, p.titulo, p.contenido, p.fecha_creacion AS fechaCreacion, p.hora_creacion AS horaCreacion
      FROM posts p
      WHERE p.id = ?
    `, [postId])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada.' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
export const addCategoriesToPost = async (req, res) => {
  const { postId, categorias } = req.body

  try {
    const [post] = await pool.execute('SELECT id FROM posts WHERE id = ?', [postId])
    if (post.length === 0) {
      return res.status(404).json({ message: 'El post no existe.' })
    }

    const categoriasUnicas = categorias.filter((categoria, index) => {
      return categorias.indexOf(categoria) === index
    })

    for (const categoriaId of categoriasUnicas) {
      const [existingCategory] = await pool.execute('SELECT * FROM post_categorias WHERE post_id = ? AND categoria_id = ?', [postId, categoriaId])
      if (existingCategory.length === 0) {
        await pool.execute('INSERT INTO post_categorias (post_id, categoria_id) VALUES (?, ?)', [postId, categoriaId])
      }
    }

    res.status(201).json({ message: 'Categorías agregadas al post exitosamente.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

export const getPostsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId

  try {
    const [rows] = await pool.execute(`
      SELECT p.id, p.titulo, p.contenido, p.fecha_creacion AS fechaCreacion, p.hora_creacion AS horaCreacion
      FROM posts p
      INNER JOIN post_categorias pc ON p.id = pc.post_id
      WHERE pc.categoria_id = ?
    `, [categoryId])

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
export const getPostsByTitle = async (req, res) => {
  const title = req.body.title

  try {
    const [rows] = await pool.execute(`
      SELECT id, titulo, contenido, fecha_creacion AS fechaCreacion, hora_creacion AS horaCreacion
      FROM posts
      WHERE titulo LIKE ?
    `, [`%${title}%`])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron publicaciones que coincidan con el título proporcionado.' })
    }

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
