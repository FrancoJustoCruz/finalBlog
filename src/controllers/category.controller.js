import { pool } from '../config/db.js'
import { corroborarAdmin } from '../autorizar/auth.js'

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

// Obtener una categoría por su ID
export const getCategoryById = async (req, res) => {
  const categoryId = req.params.id
  try {
    const [rows] = await pool.execute('SELECT * FROM categorias WHERE id = ?', [categoryId])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada.' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  const { nombre, email, password } = req.body

  try {
    const isAdmin = await corroborarAdmin(email, password)
    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso no autorizado. Se requieren permisos de administrador.' })
    }

    await pool.execute('INSERT INTO categorias (nombre) VALUES (?)', [nombre])
    res.status(201).json({ message: 'Categoría creada exitosamente.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

// Actualizar una categoría por su ID (exclusivo para administradores)
export const updateCategory = async (req, res) => {
  const categoryId = req.params.id
  const { nombre, email, password } = req.body

  try {
    const isAdmin = await corroborarAdmin(email, password)
    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso no autorizado. Se requieren permisos de administrador.' })
    }

    const [result] = await pool.execute('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, categoryId])
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Categoría actualizada.' })
    } else {
      res.status(404).json({ message: 'Categoría no encontrada.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

// Eliminar una categoría por su ID (exclusivo para administradores)
export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id
  const { email, password } = req.body

  try {
    const isAdmin = await corroborarAdmin(email, password)
    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso no autorizado. Se requieren permisos de administrador.' })
    }

    const [result] = await pool.execute('DELETE FROM categorias WHERE id = ?', [categoryId])
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Categoría eliminada.' })
    } else {
      res.status(404).json({ message: 'Categoría no encontrada.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
