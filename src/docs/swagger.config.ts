import swaggerDocument from './swagger.json';

export const swaggerSpec = swaggerDocument;

export const swaggerUiOptions = {
  customSiteTitle: "Node Upskilling API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: false,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true
  }
};