import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';

const router = express.Router();

router.use(authenticate); // todas protegidas

router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
