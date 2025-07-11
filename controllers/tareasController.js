// operaciónes de las tareas

import tareas from '../models/tarea.js';
const getAllTasks = (req, res) => {
res.status(200).json(tareas);
};
const createTask = (req, res) => {
const { id, title, description, completed, priority } = req.body;
if (tareas.find(t => t.id === id)) return res.status(400).json({ message:
'El ID ya está en uso' });
if (priority < 1 || priority > 5) return res.status(400).json({ message:
'La prioridad debe estar entre 1 y 5' });
if (!title) return res.status(400).json({ message: 'El título esobligatorio' });
const nuevaTarea = { id, title, description, completed: completed ||
false, priority };

tareas.push(nuevaTarea);
res.status(201).json(nuevaTarea);
};
const updateTask = (req, res) => {
const id = Number(req.params.id);
const index = tareas.findIndex(t => t.id === id);
if (index === -1) return res.status(404).json({ message: 'Tarea noencontrada' });
tareas[index] = { ...tareas[index], ...req.body };
res.status(200).json(tareas[index]);
};
const deleteTask = (req, res) => {
const id = Number(req.params.id);
const index = tareas.findIndex(t => t.id ===id);
if (index === -1) return res.status(404).json({ message: 'Tarea no encontrada' });
tareas.splice(index, 1);
res.status(200).json({ message: 'Tarea eliminada' });
};
const getAdvancedStats = (req, res) => {
const total = tareas.length;
const completadas = tareas.filter(t => t.completed).length;
const pendientes = tareas.filter(t => !t.completed);
const promedioPrioridad = pendientes.length > 0
? pendientes.reduce((sum, t) => sum + t.priority, 0) / pendientes.length
: 0;
res.status(200).json({ total, completadas, promedioPrioridad })};
;
export default {
getAllTasks,
createTask,
updateTask,
deleteTask,
getAdvancedStats
};
