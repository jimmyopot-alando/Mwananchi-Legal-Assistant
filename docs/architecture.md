# 🏗️ System Architecture - Mwananchi Legal Assistant

## 1. Overview
The Mwananchi Legal Assistant is a **MERN stack application** enhanced with **Python microservices** for AI/ML tasks. It provides legal guidance, document drafting, fee calculation, and court information.

---

## 2. Core Components
- **Frontend (React)**  
  - Web interface for users to ask questions, generate documents, and view fees/courts.
  - Responsive design for desktop and mobile.

- **Mobile (React Native)**  
  - Native app for Android/iOS with similar functionality to the web frontend.

- **Backend (Node.js + Express)**  
  - REST API handling authentication, payments, document generation, and court finder.
  - Connects to MongoDB for persistent storage.

- **Database (MongoDB)**  
  - Stores users, documents, cases, payments, and court data.

- **Python Microservices (FastAPI)**  
  - **Reasoning Service**: NLP + legal text analysis.  
  - **Voice Service**: Speech-to-text and text-to-speech.  
  - **Security Service**: Privacy guard and encryption.  
  - **GPS Service**: Geospatial indexing for court finder.  
  - **Fee Calculator Service**: Computes legal fees dynamically.

- **Metrics Dashboard (Express + Chart.js)**  
  - Visualizes requests, errors, and feature usage.  
  - Reads from `analytics.json`.

---

## 3. Data Flow
1. **User Interaction** → via frontend/mobile.  
2. **API Request** → sent to backend (Express).  
3. **Backend Processing** → routes request to appropriate controller/service.  
4. **Microservice Call** → Python FastAPI handles AI/ML tasks.  
5. **Database Query** → MongoDB stores/retrieves data.  
6. **Response** → returned to frontend/mobile.  
7. **Metrics Logging** → usage data stored in `analytics.json` for dashboard.

---

## 4. Deployment
- **Docker Compose** orchestrates services:
  - `mongo` → database  
  - `backend` → Node.js API  
  - `frontend` → React web app  
  - `microservices` → Python AI services  
- **PM2** manages backend processes.  
- **Scripts** (`deploy.sh`, `seedData.js`, `backup.sh`) automate deployment, seeding, and backups.

---

## 5. Security
- JWT-based authentication.  
- Encrypted storage for sensitive data.  
- Privacy guard microservice for compliance.  
- Role-based access control (admin vs user).

---

## 6. Scalability
- Microservices architecture allows independent scaling.  
- MongoDB supports horizontal scaling with sharding.  
- Frontend and backend can be containerized and deployed on cloud platforms.  

---

**End of Document**
