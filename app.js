// creacion del archivo principal app.js 
import express from 'express';
import tareasRoutes from './routes/tareasRoutes.js';
const app = express();
app.use(express.json());
app.use('/tasks', tareasRoutes);
app.listen(3000, () => {
console.log('Servidor iniciado en http://localhost:3000');
});
export default app;


