import express from 'express';
import questionnaireRoutes from './questionnaire/routes/questionnaire.routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

app.use('/api/questionnaires', questionnaireRoutes);

export default app;
