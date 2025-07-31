import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api-docs.json:
 *   get:
 *     summary: Get OpenAPI specification in JSON format
 *     tags: [Documentation]
 *     security: []
 *     responses:
 *       200:
 *         description: OpenAPI 3.0 specification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Complete OpenAPI specification for this API
 */
router.get('/api-docs.json', (_req, res) => {
  const { swaggerSpec } = require('../config/swagger.config');
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default router;