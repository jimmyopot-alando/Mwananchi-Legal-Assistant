# Mwananchi Legal Assistant

Mwananchi Legal Assistant is a citizen‑focused justice platform designed to democratize access to legal services.  
It combines a **MERN stack** (MongoDB, Express, React, Node.js) with **Python AI microservices** to deliver affordable, accessible, and intelligent legal support.

## ✨ Features
- **Ask Questions**: AI‑powered Q&A for legal queries
- **Document Generator**: Draft contracts, affidavits, and petitions
- **Know Your Rights**: Interactive rights library
- **Court Finder**: GPS‑based nearest court locator
- **Payments**: Integrated with M‑Pesa for secure transactions
- **Voice Support**: Speech‑to‑text and text‑to‑speech for accessibility

## 🏗 Architecture
- **Backend**: Node.js + Express REST API
- **Frontend**: React web app
- **Mobile**: React Native app
- **AI Services**: Python microservices for NLP, compliance, and document drafting
- **Data Layer**: MongoDB + curated legal datasets
- **Deployment**: Docker Compose orchestration

## 📂 Project Structure

Mwananchi-Legal-Assistant/
│
├── docs/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   └── tests/
│       ├── unit/
│       └── integration/
│
├── ai-services/
│   ├── reasoning/
│   ├── voice/
│   ├── security/
│   └── tests/
│       ├── unit/
│       └── integration/
│
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       ├── icons/
│   │       └── images/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   └── tests/
│       ├── unit/
│       └── e2e/
│
├── mobile/
│   ├── screens/
│   └── assets/
│       ├── icons/
│       └── images/
│
├── data/
│   ├── laws/
│   ├── templates/
│   ├── courts/
│   └── fees/
│
├── scripts/
│
└── metrics/
    └── reports/

## 🚀 Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/Mwananchi-Legal-Assistant.git
Install dependencies:

bash
npm install
pip install -r ai-services/reasoning/requirements.txt
Run with Docker:

bash
docker-compose up
🤝 Contributing
We welcome contributions from developers, lawyers, and civic innovators.
Please read the contribution guidelines before submitting pull requests.

📜 License
This project is licensed under the MIT License.