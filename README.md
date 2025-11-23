# MeetUp Events Backend

This is the backend API for the **MeetUp Events Web App**, built using **Node.js**, **Express**, and **MongoDB**.  
It provides REST API endpoints to create, fetch, and manage event data.

---

## 🚀 Features
- Create new events  
- Fetch all events  
- Fetch a single event  
- Update events  
- Delete events  
- MongoDB database connection  
- Deployed on Vercel  

---

## 🔧 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **CORS**
- **Vercel Serverless Functions**

---

## 📁 Project Structure
backend/
│── controllers/
│── models/
│── routes/
│── .env
│── index.js
│── package.json

yaml
Copy code

---

## ⚙️ Environment Variables
Create a `.env` file in the root and add:

MONGO_URI=your_mongo_connection_string

yaml
Copy code

---

## ▶️ Running the Backend Locally

### 1. Install dependencies
npm install

shell
Copy code

### 2. Start the server
npm start

arduino
Copy code

Server will run at:
http://localhost:5000

yaml
Copy code

---

## 🌐 Deployment (Vercel)

The backend is deployed at:  
**https://meet-up-events-backend.vercel.app**

---

## 📡 API Endpoints

### ➤ Get all events
GET /events

shell
Copy code

### ➤ Create event
POST /events

shell
Copy code

### ➤ Update event
PATCH /events/:id

shell
Copy code

### ➤ Delete event
DELETE /events/:id

yaml
Copy code

---

## 📬 Example Event Object
{
"title": "Tech Meetup",
"description": "A meetup for developers",
"date": "2024-11-21",
"location": "Guwahati",
"image": "https://example.com/image.jpg"
}

yaml
Copy code

---

## 🙌 Author
Developed by **Mridul Roy** as part of a full-stack assignment project.
