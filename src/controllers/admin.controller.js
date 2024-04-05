import { pool } from '../config/db.js'
import { corroborarAdmin } from '../autorizar/auth.js'

export const getUsers = async (req, res) => {
  try {
    // Verificar si se proporcionaron los datos esperados en el cuerpo de la solicitud
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Se esperaba un cuerpo de solicitud con email y contraseña.' })
    }

    // Verificar si el usuario es administrador
    const esAdmin = await corroborarAdmin(req.body.email, req.body.password)
    if (!esAdmin) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Consulta SQL para seleccionar todos los usuarios
    const [rows] = await pool.execute('SELECT id, nombre, apellido, email, celular, role_id FROM users')

    // Verificar si se obtuvieron resultados
    if (rows.length > 0) {
      // Devolver los usuarios en formato JSON
      return res.json(rows)
    } else {
      return res.status(404).json({ message: 'No se encontraron usuarios.' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno.' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    // Consulta SQL para seleccionar un usuario por ID
    const [rows] = await pool.execute('SELECT id, nombre, apellido, email, celular, role_id FROM users WHERE id = ?', [userId])

    // Verificar si se obtuvieron resultados
    if (rows.length > 0) {
      // Devolver el usuario en formato JSON
      res.json(rows[0])
    } else {
      res.status(404).json({ message: 'Usuario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
