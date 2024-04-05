import { pool } from '../config/db.js'

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])

    if (user.length === 0 || user[0].password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }

    const roleQuery = await pool.execute('SELECT nombre FROM rol WHERE id = ?', [user[0].role_id])
    const roleName = roleQuery[0][0].nombre

    res.status(200).json({ message: 'Inicio de sesión exitoso.', role: roleName })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno.' })
  }
}
