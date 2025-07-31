import pool from '../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email y password son requeridos' });

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ message: 'Email ya registrado' });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name || null, email, hash]
    );
    return res.status(201).json({ id: result.insertId, email, name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email y password son requeridos' });

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Credenciales inválidas' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const payload = {
      sub: user.id,
      email: user.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno' });
  }
};
