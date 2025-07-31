# Swagger UI Integration Guide

## Overview

This Express application now includes comprehensive Swagger UI documentation for all API endpoints. The integration provides interactive API documentation with schema validation, request/response examples, and JWT authentication support.

## Accessing the Documentation

### Swagger UI Interface
- **URL**: `http://localhost:3000/api-docs`
- **Description**: Interactive web interface for exploring and testing API endpoints

### OpenAPI JSON Specification
- **URL**: `http://localhost:3000/api-docs.json`
- **Description**: Raw OpenAPI 3.0 specification in JSON format

## API Documentation Structure

### Authenticated Endpoints
Most endpoints require JWT Bearer token authentication. Use the "Authorize" button in Swagger UI to set your JWT token.

### API Groups

#### 🔐 Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### 👤 Users
- `PATCH /api/users/{id}` - Update user information

#### 📝 Blogs
- `GET /api/blogs` - Get all blogs (with pagination)
- `GET /api/blogs/{id}` - Get specific blog
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/{id}` - Update blog (owner only)
- `DELETE /api/blogs/{id}` - Delete blog (owner only)

#### 🏷️ Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

#### 🏥 System
- `GET /api/health` - Health check endpoint

## Schema Documentation

### Data Models
- **User**: User registration/profile data
- **LoginRequest**: Authentication credentials
- **AuthResponse**: Login response with JWT token
- **Blog**: Blog post creation/update data
- **BlogResponse**: Blog post with populated references
- **Category**: Category data
- **CategoryResponse**: Category with metadata
- **PaginatedBlogResponse**: Paginated blog listing
- **ErrorResponse**: Standard error format
- **ValidationErrorResponse**: Validation error format

### Authentication
- **Type**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer <token>`
- **Note**: Obtain tokens via `/api/auth/login` or `/api/auth/register`

## Development Features

### Interactive Testing
- Use the "Try it out" button on any endpoint to test with sample data
- Responses include proper HTTP status codes and error messages
- Request/response examples are provided for all endpoints

### Schema Validation
- All request bodies are validated against OpenAPI schemas
- Response schemas document the expected data structure
- Type-safe interfaces ensure consistent API behavior

## Technical Implementation

### Dependencies Added
```json
{
  "swagger-ui-express": "^5.x.x",
  "swagger-jsdoc": "^6.x.x",
  "@types/swagger-ui-express": "^4.x.x",
  "@types/swagger-jsdoc": "^3.x.x"
}
```

### Configuration Files
- `src/config/swagger.config.ts` - Main Swagger configuration
- JSDoc comments in route files - Endpoint documentation

### Key Features
- OpenAPI 3.0 specification
- JWT Bearer token authentication
- Comprehensive schema definitions
- Request/response validation
- Interactive UI with "Try it out" functionality
- Persistent authorization across page reloads

## Usage Examples

### 1. User Registration
```bash
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

### 2. User Login
```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

### 3. Create Blog (with JWT)
```bash
curl -X POST "http://localhost:3000/api/blogs" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Blog",
    "content": "This is the content of my blog post",
    "category": "64f7b1a2c3d4e5f6789a0b1c"
  }'
```

## Development Workflow

1. **Start the server**: `npm run dev`
2. **Open Swagger UI**: Navigate to `http://localhost:3000/api-docs`
3. **Authenticate**: Use the "Authorize" button to set your JWT token
4. **Test endpoints**: Use the "Try it out" feature on any endpoint
5. **View schemas**: Explore the Models section for data structures

## Notes

- All endpoints returning arrays use proper pagination where applicable
- Error responses follow consistent format across all endpoints
- JWT tokens must be valid and non-expired for protected endpoints
- The health endpoint (`/api/health`) is publicly accessible
- Swagger UI persists authorization tokens across browser sessions