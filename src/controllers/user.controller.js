import { pool } from '../config/db.js'
import { verificarPropietarioUsuario } from '../autorizar/auth.js'
import fs from 'fs/promises'

export const deleteUser = async (req, res) => {
  try {
    const userIdFromRequest = req.params.id
    const { email, password } = req.body

    const isOwner = await verificarPropietarioUsuario(userIdFromRequest, email, password)
    if (!isOwner) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta cuenta.' })
    }

    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [userIdFromRequest])

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Usuario eliminado.' })
    } else {
      res.status(404).json({ message: 'Usuario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const userIdFromRequest = req.params.id
    const { email, password, nombre, apellido, celular, role, profilePicture } = req.body

    const isOwner = await verificarPropietarioUsuario(userIdFromRequest, email, password)
    if (!isOwner) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar los datos de este usuario.' })
    }

    let sql = 'UPDATE users SET'
    const values = []

    if (nombre) {
      sql += ' nombre = ?,'
      values.push(nombre)
    }
    if (apellido) {
      sql += ' apellido = ?,'
      values.push(apellido)
    }
    if (celular) {
      sql += ' celular = ?,'
      values.push(celular)
    }
    if (role) {
      sql += ' role_id = ?,'
      values.push(role)
    }
    if (profilePicture) {
      const imagePath = profilePicture.startsWith('uploads/') ? profilePicture.slice(8) : profilePicture
      try {
        await fs.access(`uploads/${imagePath}`)
      } catch (error) {
        return res.status(400).json({ message: 'La imagen proporcionada no existe.' })
      }
      sql += ' profile_picture = ?,'
      values.push(imagePath)
    }

    sql = sql.slice(0, -1) + ' WHERE id = ?'
    values.push(userIdFromRequest)

    const [result] = await pool.execute(sql, values)

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Usuario actualizado correctamente.' })
    } else {
      res.status(404).json({ message: 'Usuario no encontrado.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
