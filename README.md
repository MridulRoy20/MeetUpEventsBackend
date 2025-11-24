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

---

## ⚙️ Environment Variables
Create a `.env` file in the root and add:

MONGO_URI=your_mongo_connection_string

---

## ▶️ Running the Backend Locally

### 1. Install dependencies
npm install



### 2. Start the server
npm start

Server will run at:
http://localhost:5000

---

## 🌐 Deployment (Vercel)

The backend is deployed at:  
**https://meet-up-events-backend.vercel.app**

---

## 📡 API Endpoints

### ➤ Get all events
GET /events

### ➤ Create event
POST /events


### ➤ Update event
PATCH /events/:id

### ➤ Delete event
DELETE /events/:id

---

## 📬 Example Event Object
{
"title": "Tech Meetup",
"description": "A meetup for developers",
"date": "2024-11-21",
"location": "Guwahati",
"image": "https://example.com/image.jpg"
}


---

## 🙌 Author
Developed by **Mridul Roy** as part of a full-stack assignment project.
