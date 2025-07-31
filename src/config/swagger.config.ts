import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'VOIS Upscaling Node API',
    version: '1.0.0',
    description: 'A comprehensive blog management API with user authentication and category management',
    contact: {
      name: 'Sherif Ahmed',
      email: 'sherif.abdalhakam@vodafone.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Bearer token',
      },
    },
    schemas: {
      // User Schemas
      User: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            description: 'User full name',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            description: 'User password (min 8 characters, contains uppercase, lowercase, number, and special character)',
            example: 'Password123!',
          },
        },
      },
      UserResponse: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'User unique identifier',
            example: '64f7b1a2c3d4e5f6789a0b1c',
          },
          name: {
            type: 'string',
            description: 'User full name',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'User creation timestamp',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'User last update timestamp',
          },
        },
      },
      UserUpdate: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            description: 'Updated user name',
            example: 'John Smith',
          },
        },
      },
      
      // Auth Schemas
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            description: 'User password',
            example: 'Password123!',
          },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'JWT authentication token',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          user: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'User unique identifier',
                example: '64f7b1a2c3d4e5f6789a0b1c',
              },
              name: {
                type: 'string',
                description: 'User full name',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'User email address',
                example: 'john.doe@example.com',
              },
            },
          },
        },
      },

      // Category Schemas
      Category: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            description: 'Category name',
            example: 'Technology',
          },
        },
      },
      CategoryResponse: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Category unique identifier',
            example: '64f7b1a2c3d4e5f6789a0b1c',
          },
          name: {
            type: 'string',
            description: 'Category name',
            example: 'Technology',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Category creation timestamp',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Category last update timestamp',
          },
        },
      },

      // Blog Schemas
      Blog: {
        type: 'object',
        required: ['title', 'content', 'category'],
        properties: {
          title: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            description: 'Blog post title',
            example: 'Introduction to Node.js',
          },
          content: {
            type: 'string',
            minLength: 10,
            description: 'Blog post content',
            example: 'This is a comprehensive guide to Node.js...',
          },
          category: {
            type: 'string',
            description: 'Category ObjectId reference',
            example: '64f7b1a2c3d4e5f6789a0b1c',
          },
        },
      },
      BlogResponse: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Blog unique identifier',
            example: '64f7b1a2c3d4e5f6789a0b1c',
          },
          title: {
            type: 'string',
            description: 'Blog post title',
            example: 'Introduction to Node.js',
          },
          content: {
            type: 'string',
            description: 'Blog post content',
            example: 'This is a comprehensive guide to Node.js...',
          },
          category: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'Category unique identifier',
                example: '64f7b1a2c3d4e5f6789a0b1c',
              },
              name: {
                type: 'string',
                description: 'Category name',
                example: 'Technology',
              },
            },
          },
          owner: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'User unique identifier',
                example: '64f7b1a2c3d4e5f6789a0b1c',
              },
              name: {
                type: 'string',
                description: 'User full name',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'User email address',
                example: 'john.doe@example.com',
              },
            },
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Blog creation timestamp',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Blog last update timestamp',
          },
        },
      },

      // Pagination Schema
      PaginatedBlogResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/BlogResponse',
            },
          },
          total: {
            type: 'number',
            description: 'Total number of blogs',
            example: 150,
          },
          page: {
            type: 'number',
            description: 'Current page number',
            example: 1,
          },
          limit: {
            type: 'number',
            description: 'Number of items per page',
            example: 10,
          },
        },
      },

      // Error Schemas
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'Item not found',
          },
        },
      },
      ValidationErrorResponse: {
        type: 'object',
        properties: {
          errors: {
            type: 'object',
            description: 'Validation errors object',
            additionalProperties: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            example: {
              email: ['Invalid email format'],
              password: ['Password must contain at least 8 characters'],
            },
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiOptions: SwaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
  },
};