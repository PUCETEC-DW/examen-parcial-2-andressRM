import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';
describe('API de Tareas Avanzadas', () => {
let id;
it('Debe crear una tarea nueva', async () => {
const res = await request(app).post('/tasks').send({ id: 1, title:
'Tarea de prueba', description: '...', completed: false, priority: 3 });
expect(res.statusCode).toBe(201);
expect(res.body).toHaveProperty('id');
id = res.body.id;
});
it('Debe rechazar una prioridad fuera de rango', async () => {const res = await request(app).post('/tasks').send({ id: 2, title:
'Error', description: '...', priority: 10 });
expect(res.statusCode).toBe(400);
});
it('Debe listar todas las tareas', async () => {
const res = await request(app).get('/tasks');
expect(res.statusCode).toBe(200);
expect(Array.isArray(res.body)).toBe(true);
});
it('Debe actualizar una tarea', async () => {
const res = await request(app).put(`/tasks/${id}`).send({ completed:
true });
expect(res.statusCode).toBe(200);
expect(res.body.completed).toBe(true);
});
it('Debe devolver el resumen de tareas', async () => {
const res = await request(app).get('/tasks/summary');
expect(res.statusCode).toBe(200);
expect(res.body).toHaveProperty('total');
expect(res.body).toHaveProperty('completadas');
expect(res.body).toHaveProperty('promedioPrioridad');
});
it('Debe eliminar una tarea', async () => {
const res = await request(app).delete(`/tasks/${id}`);
expect(res.statusCode).toBe(200);
});
});
