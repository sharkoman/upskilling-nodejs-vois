# VOIS Node.js Upskilling Project

A comprehensive Node.js REST API for blog management built with Express.js, TypeScript, MongoDB, and JWT authentication. This project serves as a practical learning exercise for Node.js backend development featuring modern best practices and complete API documentation.

## 🚀 Features

- **Authentication & Authorization**: JWT-based user authentication with secure login/register
- **Blog Management**: Full CRUD operations for blog posts with ownership validation
- **Category System**: Organize blogs with categories
- **User Management**: User profile management and validation
- **Interactive API Documentation**: Comprehensive Swagger UI documentation
- **Data Validation**: Robust input validation using Zod schemas
- **Security**: Password hashing with bcrypt and JWT token validation
- **Testing**: Comprehensive test suite with Jest and Supertest
- **TypeScript**: Full TypeScript support with strict type checking

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v5 or higher) - Running locally or MongoDB Atlas account

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd node-upskilling
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
   
   Add the following environment variables:
   ```env
   # Server Configuration
   PORT=3000

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/blog-api
   # For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   ```

   > **⚠️ Important**: Replace `your-super-secret-jwt-key-here-make-it-long-and-random` with a strong, random secret key.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with hot reload using `tsx` and watches for file changes.

### Production Build
```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Clean Build
```bash
# Remove build artifacts and node_modules
npm run clean

# Reinstall dependencies
npm install
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Test Coverage Report
```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage/` directory.

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **OpenAPI JSON**: [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

### Quick API Overview

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/register` | POST | User registration | ❌ |
| `/api/auth/login` | POST | User login | ❌ |
| `/api/users/{id}` | PATCH | Update user profile | ✅ |
| `/api/blogs` | GET | Get all blogs (paginated) | ❌ |
| `/api/blogs` | POST | Create new blog | ✅ |
| `/api/blogs/{id}` | GET | Get specific blog | ❌ |
| `/api/blogs/{id}` | PUT | Update blog (owner only) | ✅ |
| `/api/blogs/{id}` | DELETE | Delete blog (owner only) | ✅ |
| `/api/categories` | GET | Get all categories | ❌ |
| `/api/categories` | POST | Create category | ✅ |
| `/api/categories/{id}` | PUT | Update category | ✅ |
| `/api/categories/{id}` | DELETE | Delete category | ✅ |

### Authentication Flow

1. **Register a new user** or **login** with existing credentials
2. **Copy the JWT token** from the response
3. **Use the "Authorize" button** in Swagger UI to set the token
4. **Access protected endpoints** with the authenticated session

## 🏗️ Project Structure

```
node-upskilling/
├── __mocks__/                     # Jest mock files
│   ├── bcrypt-ts.ts              # bcrypt mocking for tests
│   ├── jsonwebtoken.ts           # JWT mocking for tests
│   └── mongoose.ts               # Mongoose mocking for tests
├── __tests__/                    # Test files
│   └── auth.route.spec.ts        # Authentication route tests
├── src/
│   ├── app.ts                    # Main application entry point
│   ├── constants/                # Application constants
│   │   ├── index.ts             # Exports barrel
│   │   ├── response-status.ts   # HTTP status constants
│   │   ├── validation-messages.const.ts  # Validation error messages
│   │   └── validation-numbers.const.ts   # Validation number constants
│   ├── docs/                    # API documentation
│   │   ├── swagger.config.ts    # Swagger configuration
│   │   └── swagger.json         # OpenAPI specification
│   ├── middlewares/             # Express middlewares
│   │   ├── auth.middleware.ts   # JWT authentication middleware
│   │   ├── blog-ownership.middleware.ts  # Blog ownership validation
│   │   ├── error.middleware.ts  # Global error handling
│   │   ├── index.ts            # Middlewares barrel
│   │   └── validate-body.middleware.ts   # Request validation
│   ├── models/                  # Data models and business logic
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.controller.ts  # Auth request handlers
│   │   │   ├── auth.interface.ts   # Auth type definitions
│   │   │   ├── auth.validator.ts   # Auth validation schemas
│   │   │   └── index.ts           # Auth module exports
│   │   ├── blog/               # Blog module
│   │   │   ├── blog.controller.ts  # Blog request handlers
│   │   │   ├── blog.interface.ts   # Blog type definitions
│   │   │   ├── blog.model.ts      # Blog Mongoose schema
│   │   │   ├── blog.service.ts    # Blog business logic
│   │   │   ├── blog.validator.ts  # Blog validation schemas
│   │   │   └── index.ts          # Blog module exports
│   │   ├── categories/         # Category module
│   │   │   ├── categories.controller.ts  # Category handlers
│   │   │   ├── categories.service.ts     # Category business logic
│   │   │   ├── category.interface.ts     # Category types
│   │   │   ├── category.model.ts         # Category Mongoose schema
│   │   │   ├── category.validator.ts     # Category validation
│   │   │   └── index.ts                 # Category exports
│   │   └── users/              # User module
│   │       ├── index.ts              # User module exports
│   │       ├── user.interface.ts     # User type definitions
│   │       ├── user.model.ts         # User Mongoose schema
│   │       ├── user.validator.ts     # User validation schemas
│   │       ├── users.controller.ts   # User request handlers
│   │       └── users.service.ts      # User business logic
│   ├── routes/                  # Express route definitions
│   │   ├── auth.route.ts        # Authentication routes
│   │   ├── blog.route.ts        # Blog CRUD routes
│   │   ├── category.route.ts    # Category routes
│   │   ├── swagger.route.ts     # Documentation routes
│   │   └── user.route.ts        # User management routes
│   ├── shared/                  # Shared utilities and interfaces
│   │   ├── interfaces/          # TypeScript interfaces
│   │   │   ├── express-handler.interface.ts  # Express handler types
│   │   │   ├── index.ts                     # Interface exports
│   │   │   └── paginated-response.interface.ts  # Pagination types
│   │   └── utils/               # Utility functions
│   │       ├── async-route.util.ts         # Async route wrapper
│   │       ├── email-validator.util.ts     # Email validation
│   │       ├── index.ts                    # Utils exports
│   │       ├── password-validation.util.ts  # Password validation
│   │       └── validate-request-body.util.ts  # Request validation
│   └── startup/                 # Application initialization
│       ├── db.startup.ts        # Database connection setup
│       └── routes.startup.ts    # Routes and middleware setup
├── jest.config.js               # Jest testing configuration
├── jest.setup.js               # Jest setup file
├── package.json                # Node.js dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── SWAGGER_INTEGRATION_GUIDE.md  # Detailed API documentation guide
```

## 🔧 Technologies Used

### Core Technologies
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **jsonwebtoken** - JWT implementation
- **bcrypt-ts** - Password hashing

### Validation & Documentation
- **Zod** - Schema validation
- **Swagger UI Express** - API documentation
- **swagger-jsdoc** - JSDoc to OpenAPI conversion

### Development & Testing
- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- **tsx** - TypeScript execution for development
- **ts-jest** - Jest TypeScript support

## 🎯 Learning Objectives

This project demonstrates:

1. **REST API Design**: Proper HTTP methods, status codes, and resource naming
2. **Authentication**: JWT-based stateless authentication
3. **Authorization**: Role-based access control and resource ownership
4. **Data Modeling**: MongoDB schema design with Mongoose
5. **Validation**: Input validation with type-safe schemas
6. **Error Handling**: Centralized error handling and proper error responses
7. **Testing**: Unit and integration testing strategies
8. **Documentation**: API documentation with OpenAPI/Swagger
9. **TypeScript**: Advanced TypeScript patterns and type safety
10. **Project Structure**: Modular architecture and separation of concerns

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **Input Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Secure error messages that don't leak sensitive information
- **CORS Ready**: Configurable CORS support for frontend integration

## 🚦 Development Guidelines

### Code Style
- Use TypeScript for all source files
- Follow the established folder structure
- Use descriptive variable and function names
- Implement proper error handling
- Write tests for new features

### Git Workflow
- Create feature branches from `main`
- Write descriptive commit messages
- Include tests with new features
- Update documentation as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 👨‍💻 Author

**Sherif Ahmed** - [sherif.abdalhakam@vodafone.com](mailto:sherif.abdalhakam@vodafone.com)

## 🙏 Acknowledgments

- VOIS (Vodafone Intelligent Solutions) for the learning opportunity
- The Node.js and Express.js communities for excellent documentation
- Contributors to the open-source packages used in this project

---

For detailed API usage examples and advanced configuration, see the [Swagger Integration Guide](./SWAGGER_INTEGRATION_GUIDE.md).