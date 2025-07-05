# 🌐 Linkora

**Linkora** is a real-time language exchange platform where users can sign up, connect with global friends, chat instantly, and start video calls. Built with a modern full-stack architecture using React, Node.js, MongoDB, and Stream API.

## 🧠 Features

- 🔐 Sign up / Login with onboarding
- 💬 Real-time chat via Stream API
- 📹 1:1 Video calling support
- 🤝 Smart friend recommendations
- 🎨 Clean, responsive UI with theme toggle

## 📁 Project Structure
linkora/
├── frontend/ → React + Tailwind CSS client
├── backend/ → Express + MongoDB server


## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devina0810/Linkora.git
   cd linkora

2. **Install Dependencies**
    cd frontend
    npm install
    cd ../backend
    npm install

3. **Set up environment variables**
    Create .env files in both frontend and backend folders:
    frontend/.env
      VITE_STREAM_API_KEY=your_stream_key
    backend/.env
      MONGODB_URI=your_mongo_connection_string
      JWT_SECRET=your_jwt_secret
      STEAM_API_KEY=your_stream_key
      STEAM_API_SECRET=your_stream_secret

4. **Run the app locally**
    Frontend:
      cd frontend
      npm run dev
    Backend:
      cd backend
      npm run dev

5. **🛠️ Tech Stack**
    Frontend: React, Tailwind CSS, Stream Chat SDK
    Backend: Node.js, Express, MongoDB
    Authentication: JWT
    Real-time Messaging: Stream API
    Deployment: Vercel (frontend), Render/Node (backend)

## 📸 Demo


