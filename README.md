Notion Academy - EdTech Platform
Project Overview
Notion Academy is a full-featured EdTech platform built on the MERN stack, where users can enroll as Admins, Instructors, or Students.

Admins manage the platform and create course categories like Web Development, Machine Learning, etc.
Instructors create, draft, and publish courses, upload content to Cloudinary, and organize it with sections and subsections.
Students can enroll in courses, track progress, and interact with course content.
Each course also includes a Doubt Forum, allowing students to ask questions and interact with instructors and other students, fostering a collaborative learning environment.

Tech Stack
Frontend: React.js for building interactive UI and Redux for state management.
Backend: Node.js with Express for server-side logic and APIs.
Database: MongoDB Atlas for scalable data storage.
Authentication: JWT for secure user authentication.
Media Storage: Cloudinary for image and video uploads.
Email Service: Nodemailer for user notifications.
Key Features
Secure Authentication: Passwords hashed with bcrypt, with user sessions managed via jsonwebtoken (JWT).
Cloud Storage: Integrated Cloudinary for media uploads, with secure URLs stored in MongoDB.
MongoDB Atlas: Used for scalable and efficient data storage.
Course Doubt Forum: Each course has a dedicated doubt forum where students can post questions, receive answers, and engage in discussions.
