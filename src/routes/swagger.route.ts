import { Router } from "express";

const router = Router();


router.get('/api-docs.json', (_req, res) => {
  const { swaggerSpec } = require('../docs/swagger.config');
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default router;