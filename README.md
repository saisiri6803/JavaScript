# JavaScript Projects Repository

Welcome to the JavaScript Projects Repository! This is a monorepo containing multiple JavaScript projects.

## 📁 Projects

### 1. **PingPong Game** 
Located in: `pingpong-game/`

A classic Pong game implementation in JavaScript with:
- Player vs Computer gameplay
- Smooth animations
- Score tracking
- Responsive controls

**Tech Stack:**
- Vanilla JavaScript
- HTML5 Canvas
- CSS3

**Getting Started:**
```bash
cd pingpong-game
npm install
npm start
```

### 2. **TypingForge** 
Located in `typingforge/`

A typing speed and accuracy testing application with:
- Real-time WPM (Words Per Minute) calculation
- Accuracy tracking
- Difficulty levels
- Leaderboard

**Tech Stack:**
- JavaScript (React/Vanilla)
- HTML5
- CSS3

**Getting Started:**
```bash
cd typingforge
npm install
npm start
```

## 📂 Repository Structure

```
JavaScript/
├── pingpong-game/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── package.json
│   └── README.md
├── typingforge/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── package.json
│   └── README.md
├── .github/
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
├── docs/
│   ├── CONTRIBUTING.md
│   └── ARCHITECTURE.md
└── README.md (this file)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

Clone the repository:
```bash
git clone https://github.com/saisiri6803/JavaScript.git
cd JavaScript
```

Install dependencies for individual projects:
```bash
cd pingpong-game
npm install

# Or for TypingForge
cd ../typingforge
npm install
```

### 2. ***TaskFlow API***
Located in: `Task-Flow/`

A production-ready **RESTful Task Management API** built with **Node.js**, **Express**, and **MongoDB** (Mongoose). Features JWT-based authentication, full CRUD operations, aggregation-based stats, filtering, pagination, and rate limiting.

##  Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Runtime      | Node.js 18+                        |
| Framework    | Express.js                          |
| Database     | MongoDB + Mongoose ODM              |
| Auth         | JWT (jsonwebtoken) + bcryptjs       |
| Validation   | express-validator                   |
| Security     | helmet, cors, express-rate-limit    |
| Testing      | Jest + Supertest + MongoMemoryServer|

##  Project Structure

```
taskflow-api/
├── src/
│   ├── config/
│   │   └── database.js       # Mongoose connection
│   ├── models/
│   │   ├── User.js            # User schema + password hashing
│   │   └── Task.js            # Task schema + compound indexes
│   ├── controllers/
│   │   ├── authController.js  # Register, login, profile
│   │   └── taskController.js  # CRUD + MongoDB aggregation stats
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js            # /api/auth routes
│   │   └── tasks.js           # /api/tasks routes
│   ├── app.js                 # Express app config
│   └── server.js              # Entry point (connects DB then starts)
├── tests/
│   └── api.test.js            # Integration tests (MongoMemoryServer)
├── .env.example
└── package.json
```

##  Getting Started
### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas cloud)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/taskflow-api.git
cd taskflow-api

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env — set MONGODB_URI and a strong JWT_SECRET

# 4. Start the server
npm run dev       # Development (nodemon)
npm start         # Production

## 📝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

### Workflow
1. Create a feature branch: `git checkout -b feature/project-name-feature`
2. Make your changes
3. Submit a pull request

## 🏷️ Project Labels

Use these labels when creating issues:
- `pingpong-game` - Issues related to PingPong Game
- `typingforge` - Issues related to TypingForge
- `bug` - Bug reports
- `enhancement` - Feature requests
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**saisiri6803**
- GitHub: [@saisiri6803](https://github.com/saisiri6803)

## 📞 Support

For questions or issues, please create a GitHub issue in the [Issues](https://github.com/saisiri6803/JavaScript/issues) tab.

---

**Happy Coding! 🚀**
