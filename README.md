<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS STARTER KIT

A robust, production-ready REST API built with NestJS, featuring user authentication, product management, role-based access control, and advanced caching mechanisms.

## 🚀 Features

- **🔐 JWT Authentication** - Secure token-based authentication system
- **👥 User Management** - Complete CRUD operations for user entities
- **📦 Product Management** - Full product lifecycle management
- **🛡️ Role-Based Access Control** - Admin, User, and Editor roles with granular permissions
- **⚡ Advanced Caching** - Redis-based caching with custom interceptors
- **🗄️ Database Integration** - Prisma ORM with MySQL database
- **🔧 TypeScript** - Full type safety and modern development experience
- **📝 API Documentation** - Comprehensive endpoint documentation
- **🧪 Testing Ready** - Jest testing framework configured

## 🏗️ Architecture

```
src/
├── api/                    # API modules
│   ├── product/           # Product management
│   │   ├── dto/          # Data Transfer Objects
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   └── product.module.ts
│   └── user/             # User management
│       ├── dto/          # Data Transfer Objects
│       ├── entities/     # Database entities
│       ├── user.controller.ts
│       ├── user.service.ts
│       └── user.module.ts
├── config/               # Configuration modules
│   ├── jwt/             # JWT authentication
│   └── prisma/          # Database configuration
├── decorator/           # Custom decorators
│   ├── no-cache/       # Cache control
│   ├── public/         # Public endpoints
│   └── roles/          # Role-based access
├── guard/              # Route guards
│   └── jwtguard/       # JWT authentication guard
├── interceptor/        # Request/Response interceptors
│   └── api-cache/      # Caching interceptor
└── main.ts             # Application entry point
```

## 🛠️ Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Caching**: Redis with NestJS Cache Manager
- **Testing**: Jest
- **Code Quality**: ESLint + Prettier

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL database
- Redis (for caching)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/sasmithx/NestJS-KIT.git
cd pro-nest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/pro_nest_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="1h"

# Application
PORT=3000
NODE_ENV=development

# Redis (for caching)
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000/api/v1`

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/v1/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "age": 30,
  "username": "johndoe",
  "password": "password123",
  "email": "john@example.com",
  "city": "New York",
  "phone": "+1234567890"
}
```

#### Login User

```http
POST /api/v1/user/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

#### Verify Token

```http
POST /api/v1/user/verifyToken
Content-Type: application/json

{
  "token": "your-jwt-token-here"
}
```

### Product Endpoints

#### Get All Products

```http
GET /api/v1/product/all-products
Authorization: Bearer <your-jwt-token>
```

#### Get Product by ID

```http
GET /api/v1/product/by-id/{id}
```

#### Create Product

```http
POST /api/v1/product/create-product
Content-Type: application/json

{
  "title": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "image": "https://example.com/image.jpg"
}
```

#### Update Product

```http
PUT /api/v1/product/update-product/{id}
Content-Type: application/json

{
  "title": "Updated Product Name",
  "price": 149.99,
  "description": "Updated description",
  "image": "https://example.com/updated-image.jpg"
}
```

#### Delete Product

```http
DELETE /api/v1/product/delete-product/{id}
```

### User Management Endpoints

#### Get All Users

```http
GET /api/v1/user
Authorization: Bearer <your-jwt-token>
```

#### Get User by ID

```http
GET /api/v1/user/{id}
Authorization: Bearer <your-jwt-token>
```

#### Update User

```http
PATCH /api/v1/user/{id}
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "name": "Updated Name",
  "age": 31,
  "city": "Updated City"
}
```

#### Delete User

```http
DELETE /api/v1/user/{id}
Authorization: Bearer <your-jwt-token>
```

## 🔐 Authentication & Authorization

### JWT Token Structure

```json
{
  "name": "John Doe",
  "role": "user",
  "iat": 1640995200,
  "exp": 1640998800
}
```

### Role-Based Access Control

The application supports three roles:

- **ADMIN**: Full system access
- **USER**: Standard user permissions
- **EDITOR**: Content management permissions

### Protected Routes

Most endpoints require authentication. Use the `@Public()` decorator for public endpoints.

## ⚡ Caching

The application implements intelligent caching with:

- **Global Cache**: 5-second TTL with 100 item limit
- **Custom Interceptors**: API response caching
- **Cache Control**: `@NoCache()` decorator for bypassing cache

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 📦 Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode

# Production
npm run build              # Build the application
npm run start:prod         # Start in production mode

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Database
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate Prisma client
```

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  age       Int
  password  String
  username  String   @unique
  city      String?
  phone     String?
  email     String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Product Model

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  title       String
  image       String
  price       Decimal
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🚀 Deployment

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="mysql://user:password@db:3306/pro_nest_prod"
JWT_SECRET="your-production-secret"
REDIS_HOST=redis
REDIS_PORT=6379
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [MIT License](LICENSE.md) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the API documentation
- Review the test files for usage examples

## 🔄 Version History

- **v0.0.1** - Initial release with basic CRUD operations and JWT authentication

---

**Built with ❤️ using NestJS**
