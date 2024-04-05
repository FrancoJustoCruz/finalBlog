import { pool } from '../config/db.js'

export const register = async (req, res) => {
  try {
    const { nombre, apellido, email, celular, password, role } = req.body

    // Validar los campos requeridos
    if (!nombre || !apellido || !email || !celular || !password || !role) {
      return res.status(400).json({ message: 'Faltan datos.' })
    }

    // Verificar si el correo electrónico ya está registrado
    const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado.' })
    }

    // Insertar el nuevo usuario con su rol
    const [result] = await pool.execute(
      'INSERT INTO users (nombre, apellido, email, celular, password, role_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, celular, password, role]
    )

    // Verificar si se creó el usuario correctamente
    if (!result.insertId) {
      return res.status(500).json({ message: 'Error al crear el usuario.' })
    }

    // Obtener los datos del usuario recién registrado
    const [user] = await pool.execute(
      'SELECT email, nombre, apellido, celular, role_id FROM users WHERE id = ?',
      [result.insertId]
    )

    res.status(201).json({ message: 'Usuario creado.', user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
