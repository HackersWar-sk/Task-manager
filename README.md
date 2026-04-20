\# Task Manager Web Application



\## Project Overview



This project is a simple Task Manager web application built as part of a Python Developer Intern assessment.



It consists of:

\- A FastAPI backend (REST API)

\- A basic frontend (HTML, CSS, JavaScript)



The application allows users to register, login, and manage their own tasks securely using JWT authentication.



\---



\## Features



\- User Registration

\- User Login with JWT Authentication

\- Create Task

\- View All Tasks

\- Mark Task as Completed

\- Delete Task

\- Each user can only access their own tasks



\---



\## Technologies Used



Backend:

\- FastAPI

\- SQLite

\- SQLAlchemy

\- JWT (python-jose)

\- Passlib (password hashing)



Frontend:

\- HTML

\- CSS

\- JavaScript



\---



\## Project Structure



task-manager/

│

├── backend/

│   └── app/

│       ├── main.py

│       ├── models.py

│       ├── database.py

│       ├── auth.py

│       └── routers/

│           ├── auth.py

│           └── tasks.py

│

├── frontend/

│   ├── login.html

│   ├── index.html

│   └── script.js

│

├── requirements.txt

├── README.md

└── .env.example



\---



\## How to Run Locally



\### 1. Backend Setup



Open terminal:



cd backend



Install dependencies:



pip install -r requirements.txt



Run server:



uvicorn app.main:app --reload



Backend will run at:

http://127.0.0.1:8000



\---



\### 2. Frontend Setup



Open another terminal:



cd frontend



Run:



python -m http.server 5500



Open in browser:



http://127.0.0.1:5500/login.html



\---



\## API Endpoints



Authentication:

\- POST /register

\- POST /login



Tasks:

\- POST /tasks

\- GET /tasks

\- GET /tasks/{id}

\- PUT /tasks/{id}

\- DELETE /tasks/{id}



\---



\## Environment Variables



Create a .env file based on:



SECRET\_KEY=your\_secret\_key

DATABASE\_URL=sqlite:///./tasks.db



(Note: Do not commit .env file)



\---



\## Deployment



Backend: (Add your Render link here)



Frontend: (Add your Vercel link here)



\---



\## Notes



\- This project focuses on functionality, not UI design

\- All APIs are protected using JWT authentication

\- Users can only access their own tasks



\---



\## Final Status



\- Backend: Completed

\- Authentication: Completed

\- Task APIs: Completed

\- Frontend Integration: Completed

\- Ready for deployment

