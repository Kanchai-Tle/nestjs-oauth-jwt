# 🚀 NestJS Google OAuth 2.0 & JWT Authentication

> This project is an authentication API built with **NestJS**, implementing **Google OAuth 2.0** for user login and managing sessions using **JWT**. It connects to a **MariaDB** database via Docker and includes a sample **Vite + React** frontend for demonstration.

---

## ✨ Features

- ✅ **Google OAuth 2.0 Authentication**: Users can log in using their Google account.
- ✅ **JWT Integration**: Generate and verify tokens for secure API access.
- ✅ **MariaDB (via Docker)**: Relational database to store user and authentication data.
- ✅ **RESTful API**: Designed following RESTful principles.
- ✅ **Frontend Example (Vite + React)**: A demo interface that connects to the backend.
- ✅ **Docker Compose**: Simplifies setup for MariaDB and phpMyAdmin services.

---

## 🛠️ Tech Stack

### Frontend
- ⚡ **Vite**
- ⚛️ **React (TypeScript)**

### Backend
- 🧩 **NestJS**
- 🛡️ **TypeScript**
- 🔐 **Google OAuth 2.0**
- 🔑 **JWT**
- 🗃️ **MariaDB**

### Others
- 🐳 **Docker / Docker Compose**
- 📋 **phpMyAdmin**

---

## 📦 Getting Started

### ✅ Prerequisites

Ensure the following are installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or Yarn
- [Docker](https://www.docker.com/) and Docker Compose

---

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### ⚙️ 2. Setup Environment Variables

Create a `.env` file inside both `crud_authentication` (backend) and frontend folders:

```env
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
JWT_SECRET=YOUR_JWT_SECRET_KEY

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=1234
DATABASE_NAME=your_db_name
```

---

### 🐬 3. Start Database Services with Docker Compose

```bash
docker-compose up -d
```

Access phpMyAdmin at: [http://localhost:8081](http://localhost:8081)  
*Username:* `root` / *Password:* `1234`

---

### 📦 4. Install Dependencies

#### Frontend

```bash
cd frontend-folder
npm install
```

#### Backend

```bash
cd crud_authentication
npm install
```

---

### ▶️ 5. Run the Project

#### Frontend (Vite + React)

```bash
cd frontend-folder
npm run dev
```

#### Backend (NestJS)

```bash
cd crud_authentication
npm run start:dev
```

---

### 🌐 Access Points

| Service     | URL                             |
|-------------|----------------------------------|
| Frontend    | http://localhost:5173            |
| Backend API | http://localhost:3000            |
| phpMyAdmin  | http://localhost:8081            |

---

## 🤝 Contributing

Feel free to submit a Pull Request if you have suggestions or improvements! 🙌

---

## 📧 Contact

**Kanchai Lerdsrisakulrat**  
📧 kanchailerdsrisakultrat@gmail.com