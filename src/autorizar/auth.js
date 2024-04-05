import { pool } from '../config/db.js'

export const corroborarAdmin = async (userEmail, userPassword) => {
  const [user] = await pool.query('SELECT * FROM users WHERE email=? AND password=?', [userEmail, userPassword])

  if (user.length === 0) {
    return false // No se encontró ningún usuario
  }

  return user[0].role_id === 1 // Devuelve true si el usuario es administrador
}
export const corroborarCredenciales = async (userEmail, userPassword) => {
  const [user] = await pool.query('SELECT * FROM users WHERE email=? AND password=?', [userEmail, userPassword])
  return user.length > 0
}

// Función para verificar si el usuario está intentando actualizar sus propios datos
export const verificarPropietarioUsuario = async (userId, userEmail, userPassword) => {
  // Verificar las credenciales del usuario
  const credentialsValid = await corroborarCredenciales(userEmail, userPassword)
  if (!credentialsValid) {
    return false
  }

  // Verificar si el usuario está intentando actualizar sus propios datos
  const [user] = await pool.query('SELECT id FROM users WHERE id=? AND email=?', [userId, userEmail])
  return user.length > 0
}
export const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email=? AND password=?', [email, password])

    if (user.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    req.user = user[0] // Establecer req.user con la información del usuario autenticado
    next() // Pasar al siguiente middleware
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno' })
  }
}
