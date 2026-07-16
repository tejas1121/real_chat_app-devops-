<div align="center">

# 💬 Real-Time MERN Chat Application on AWS ECS Fargate

**A production-style, containerized real-time chat platform — built with the MERN stack, deployed cloud-natively on AWS.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS](https://img.shields.io/badge/AWS-ECS%20Fargate-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/ecs/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://www.nginx.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#-license)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Folder Structure](#-folder-structure)
- [Deployment Guide](#-deployment-guide)
- [Environment Variables](#-environment-variables)
- [Docker](#-docker)
- [Screenshots](#-screenshots)
- [Challenges Faced](#-challenges-faced)
- [Future Improvements](#-future-improvements)
- [License](#-license)
- [Author](#-author)

---

## 🧭 Overview

This repository contains a **real-time one-to-one chat application** built on the **MERN stack** (MongoDB, Express.js, React.js, Node.js), engineered as a **cloud-native, containerized deployment** rather than a simple local dev-server project.

Both the **client** and the **server** are packaged as independent Docker images and deployed as two separate services on **Amazon ECS Fargate** — a serverless container orchestration platform that removes the need to provision or manage EC2 instances. The frontend is served through an **Nginx** production build, the backend exposes a REST + WebSocket API via **Express** and **Socket.IO**, and persistent data is stored in **MongoDB**.

> This is not a tutorial clone — every screenshot in this README was captured from a live deployment running under this repository's own AWS account, ECR repositories, and ECS cluster.

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Cloud & DevOps |
|---|---|---|---|
| React.js | Node.js | MongoDB | Amazon ECS (Fargate) |
| Styled Components | Express.js | | Amazon ECR |
| Axios | Socket.IO | | AWS CloudWatch |
| Socket.IO Client | JWT Authentication | | AWS Security Groups |
| | Mongoose | | Docker (multi-stage builds) |
| | | | Nginx |

---

## 🏗 Architecture

### Application Runtime Architecture

```mermaid
flowchart TD
    U["👤 User Browser"] -->|HTTPS / HTTP :80| FE

    subgraph ECS["Amazon ECS Fargate Cluster — chat-app-cluster"]
        FE["🧩 React Frontend\n(chat-frontend-service)\nNginx :80"]
        BE["⚙️ Express Backend\n(chat-backend-service)\nNode.js + Socket.IO :5000"]
    end

    FE -->|REST API + WebSocket| BE
    BE -->|Mongoose Driver| DB[("🗄️ MongoDB")]

    style U fill:#0d9488,color:#fff,stroke:#0f766e
    style FE fill:#1e293b,color:#fff,stroke:#334155
    style BE fill:#1e293b,color:#fff,stroke:#334155
    style DB fill:#166534,color:#fff,stroke:#14532d
```

### CI/Deployment Pipeline

```mermaid
flowchart LR
    A["👨‍💻 Developer"] --> B["📦 GitHub Repository"]
    B --> C["🐳 Docker Build\n(multi-stage)"]
    C --> D["📤 Push to Amazon ECR"]
    D --> E["📋 ECS Task Definition\n(revision update)"]
    E --> F["🚀 ECS Service\n(chat-frontend-service /\nchat-backend-service)"]
    F --> G["🟢 Running Fargate Tasks"]

    style A fill:#0d9488,color:#fff
    style B fill:#1e293b,color:#fff
    style C fill:#2563eb,color:#fff
    style D fill:#f59e0b,color:#000
    style E fill:#1e293b,color:#fff
    style F fill:#1e293b,color:#fff
    style G fill:#166534,color:#fff
```

---

## ✨ Features

| Category | Feature |
|---|---|
| 🔐 Auth | User Registration & Login |
| 🔐 Auth | JWT-based Session Authentication |
| 🖼️ Profile | Custom Avatar Upload |
| 👥 Contacts | Contact List / Conversation Sidebar |
| 💬 Messaging | One-to-One Real-Time Messaging |
| ⚡ Real-Time | Socket.IO powered live message delivery |
| 📱 UI/UX | Fully Responsive Design |
| 🐳 Containerization | Dockerized Frontend (Nginx production build) |
| 🐳 Containerization | Dockerized Backend (Node/Express) |
| ☁️ Cloud | Deployed on AWS ECS Fargate (serverless containers) |

---

## 📂 Folder Structure

```
real_chat_app_devops/
├── client/                        # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── Contacts.jsx
│   │   │   ├── Logout.jsx
│   │   │   └── NoSelectedContact.jsx
│   │   ├── configs/
│   │   │   └── envVariables.js
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── SetProfileImage.jsx
│   │   └── utils/
│   ├── Dockerfile                 # Multi-stage build → Nginx
│   ├── nginx.conf
│   └── package.json
│
├── server/                        # Express + Socket.IO backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket.js
│   ├── Dockerfile
│   └── package.json
│
├── README-assets/                 # Screenshots used in this README
├── docker-compose.yml             # Local multi-container orchestration
└── README.md
```

---

## 🚀 Deployment Guide

<details>
<summary><strong>Click to expand full deployment walkthrough</strong></summary>

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tejas1121/real_chat_app_devops.git
cd real_chat_app_devops
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
# create a .env file — see Environment Variables section below
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
# create a .env file — see Environment Variables section below
npm start
```

### 4️⃣ Docker Build

Build production images for both services:

```bash
# Backend
cd server
docker build -t chat-backend .

# Frontend (multi-stage build, served via Nginx)
cd ../client
docker build -t chat-frontend .
```

### 5️⃣ Push Images to Amazon ECR

```bash
aws ecr get-login-password --region ap-south-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com

docker tag chat-backend:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/chat-backend:latest
docker tag chat-frontend:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/chat-frontend:latest

docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/chat-backend:latest
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/chat-frontend:latest
```

### 6️⃣ Create ECS Task Definitions

Define two Fargate task definitions — `chat-backend` and `chat-frontend` — each referencing its respective ECR image URI, CPU/memory allocation, and container port mappings (`5000` for backend, `80` for frontend).

### 7️⃣ Create ECS Services

Deploy both task definitions as **ECS Services** inside a shared cluster (`chat-app-cluster`), each running as an independent Fargate service:

- `chat-backend-service`
- `chat-frontend-service`

### 8️⃣ Access the Application

Once both services report `1/1 Tasks running`, retrieve the frontend task's **public IP** (or attach a stable endpoint — see [Future Improvements](#-future-improvements)) and open it in the browser on port `3000`/`80`.

</details>

---

## 🔑 Environment Variables

> ⚠️ Templates only — never commit real credentials.

**Backend (`server/.env`)**
```env
PORT=
MONGO_URL=
JWT_SECRET=
```

**Frontend (`client/.env`)**
```env
REACT_APP_API_URL=
```

---

## 🐳 Docker

<details>
<summary><strong>Frontend Container</strong></summary>

- Multi-stage Docker build: Node.js builds the static React bundle in stage one, then a lightweight **Nginx (alpine)** image serves the compiled static assets in stage two.
- This keeps the final image small and production-ready, avoiding the React development server entirely.

</details>

<details>
<summary><strong>Backend Container</strong></summary>

- Single-stage Express server image running the Node.js runtime.
- Exposes port `5000`, connects to MongoDB via Mongoose, and hosts the Socket.IO server for real-time events.

</details>

---

## 📸 Screenshots

> Screenshots below are captured directly from the live deployment (Docker Desktop, Amazon ECR, ECS Console, CloudWatch, and the GitHub repository itself).

### Application

**Login Page**
![Login](README-assets/login.png)



**Post-Login / Contact Selection**
![Welcome](README-assets/welcome.png)

**Real-Time One-to-One Chat**
![Realtime Chat](README-assets/realtime-chat.png)

### Local Containerization

**Docker Desktop — Local Multi-Container Stack (client / server / mongo)**
![Docker Desktop](README-assets/docker-desktop.png)

**Docker Build — Frontend Multi-Stage Build Output**
![Docker Build](README-assets/docker-build.png)

**Docker Push — Frontend Image Pushed to Amazon ECR**
![Docker Push](README-assets/docker-push.png)

### AWS Cloud Deployment

**Amazon ECR — Private Repositories**
![Amazon ECR](README-assets/ecr.png)

**ECS Cluster Overview — `chat-app-cluster`**
![ECS Cluster](README-assets/ecs-cluster.png)

**ECS Service Health — `chat-frontend-service`**
![Frontend Service Health](README-assets/ecs-frontend-health.png)

**ECS Service Health — `chat-backend-service`**
![Backend Service Health](README-assets/ecs-backend-health.png)

**ECS Task Definitions**
![Task Definitions](README-assets/ecs-task-definitions.png)

**Running Task Configuration — Backend**
![Backend Task Config](README-assets/ecs-task-backend.png)

**Running Task Configuration — Frontend**
![Frontend Task Config](README-assets/ecs-task-frontend.png)

**CloudWatch Logs — Frontend Service**
![CloudWatch Logs](README-assets/cloudwatch-logs.png)

**Security Group — Inbound Rules**
![Security Group](README-assets/security-group.png)

### Source Control

**GitHub Repository**
![GitHub Repo](README-assets/image.png)




---

## 🧩 Challenges Faced

Real deployment challenges encountered while shipping this project to AWS ECS Fargate:

- Deploying the **frontend and backend as two independent ECS services** rather than a single monolithic container, and getting them to communicate correctly.
- Configuring **Security Groups** to allow HTTP (`80`) and application traffic (`3000`) while keeping the surface area minimal.
- **Docker image optimization** — moving from a single fat image to a multi-stage build to shrink the frontend image size.
- Migrating the React app off the **development server** and onto a production **Nginx** build for the containerized deployment.
- Managing **frontend ↔ backend communication** across two separately scheduled Fargate tasks with no fixed internal DNS.
- Handling **ECS Fargate tasks receiving new public IPs** on every redeploy, before a stable endpoint was introduced.
- Debugging **Socket.IO** behavior specifically in the containerized/cloud environment (proxying, CORS, and connection upgrades).
- Correctly scoping and injecting **environment variables** for each service without baking secrets into images.
- Resolving local **Docker Desktop networking issues** (e.g., DNS resolution failures during local multi-container testing).

---

## 🔮 Future Improvements

- [ ] **Application Load Balancer (ALB)** in front of ECS services for a stable, single entry point.
- [ ] **HTTPS** via AWS Certificate Manager (ACM).
- [ ] **Custom Domain** using Route 53.
- [ ] **CI/CD Pipeline** with GitHub Actions for automated build → push → deploy.
- [ ] **Auto Scaling** policies for ECS services based on CPU/memory thresholds.
- [ ] **Redis** for session/socket state sharing across scaled instances.
- [ ] **Push/In-app Notifications**.
- [ ] **Group Chats**.
- [ ] **File Sharing** in conversations.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Tejas Burkul**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tejas1121)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tejas-burkul-6302042b5/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tejasburkul49@gmail.com)

---

<div align="center">

*If this project helped you understand containerized MERN deployments on AWS, consider leaving a ⭐*

</div>
