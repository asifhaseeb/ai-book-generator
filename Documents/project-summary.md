# AI Automated Book Generation System

## Note
Dear Sir/Madam, this project was developed with the assistance of ChatGPT for guidance, architecture understanding, and implementation support.

---

## Overview
This project is a modular and scalable AI-powered book generation system. It automates the process of creating a book from a given title, generating an outline, writing chapters using AI, and compiling the final book output.

The system is designed with a worker-based architecture and supports human-in-the-loop feedback at multiple stages (outline and chapter review).

---

## Tech Stack
- Node.js (Backend)
- Express.js (API Layer)
- MongoDB (Database)
- Google Gemini AI (Content Generation)
- Nodemailer (Email Notifications)
- File System (TXT export)
- Worker-based automation (setInterval processing)

---

## Core Features

### 1. Outline Generation
- Takes book title and editor notes
- Generates structured outline using AI
- Stores outline in database for review

### 2. Human-in-the-Loop Control
- Editor can review and add notes
- System supports regeneration based on feedback
- Status-based workflow control

### 3. Chapter Generation
- Each chapter is generated separately
- Uses previous chapter summaries as context
- Ensures continuity in storytelling

### 4. Final Compilation
- All chapters are combined into final book
- Output is saved as .txt file

### 5. Notification System
- Email alerts for:
  - Outline ready
  - Chapter generation
  - Final book completion

---

## System Architecture
API → MongoDB → Worker → Gemini AI → Chapter Engine → Compiler → Email System

---

## Key Design Approach
- Modular service-based architecture
- Worker handles background processing
- Context chaining for AI-generated chapters
- Status-driven workflow for human approval steps

---

## Future Improvements
- Integration with Supabase for scalable database
- Google Sheets / Excel input support
- Queue-based processing (BullMQ)
- PDF and DOCX export support
- Admin dashboard for workflow monitoring

---

## Conclusion
This project demonstrates an AI-powered automation pipeline that simulates real-world SaaS-level architecture for content generation systems.