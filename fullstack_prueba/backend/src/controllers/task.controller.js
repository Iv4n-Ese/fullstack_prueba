import pool from '../utils/db.js';

export const listTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const [tasks] = await pool.query('SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE user_id = ?', [userId]);
    return res.json({ tasks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno' });
  }
};

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Título es requerido' });
  if (status && !['pendiente', 'completado'].includes(status))
    return res.status(400).json({ message: 'Status inválido' });

  try {
    const userId = req.user.id;
    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
      [userId, title, description || null, status || 'pendiente']
    );
    const [created] = await pool.query('SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE id = ?', [result.insertId]);
    return res.status(201).json({ task: created[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno' });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  if (status && !['pendiente', 'completado'].includes(status))
    return res.status(400).json({ message: 'Status inválido' });

  try {
    const userId = req.user.id;
    // Verificar existencia y propiedad
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (!rows.length) return res.status(404).json({ message: 'Tarea no encontrada' });

    await pool.query(
      'UPDATE tasks SET title = COALESCE(?, title), description = COALESCE(?, description), status = COALESCE(?, status) WHERE id = ?',
      [title, description, status, taskId]
    );
    const [updated] = await pool.query('SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE id = ?', [taskId]);
    return res.json({ task: updated[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno' });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT id FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (!rows.length) return res.status(404).json({ message: 'Tarea no encontrada' });

    await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    return res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno' });
  }
};
