// Define las rutas tareasRoutes.js
import express from 'express';
import tareasController from '../controllers/tareasController.js';
const router = express.Router();
router.get('/', tareasController.getAllTasks);
router.post('/', tareasController.createTask);
router.put('/:id', tareasController.updateTask);
router.delete('/:id', tareasController.deleteTask);
router.get('/summary', tareasController.getAdvancedStats);
export default router;