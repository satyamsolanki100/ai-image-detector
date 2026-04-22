# AI Image Detector

A full-stack AI-powered web application that detects whether an image is **AI-generated or Real** using deep learning.

---

## Overview

This project allows users to:

- Upload an image
- Analyze authenticity
- Get prediction (AI Generated / Real)
- View confidence score
- See explanation
- Track detection history

It integrates a **React frontend**, **Node.js backend**, and a **Python deep learning model**.

---

## Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- Multer

### AI / ML

- Python
- PyTorch
- EfficientNet (trained model)
- Optional HuggingFace model

---

## Features

- Drag & Drop image upload
- Image preview before upload
- AI vs Real classification
- Confidence score display
- Explanation of prediction
- Detection history (localStorage)
- Responsive UI (dark theme)

---

## Project Structure

```
AI-Image-Detector/
│
├── client/
├── server/
├── ai-model/
└── README.md
```

---

## How It Works

```
User uploads image
        ↓
Frontend → Backend
        ↓
Python model runs
        ↓
Prediction returned
        ↓
Result displayed
```

---

## Installation (Local Setup)

### 1. Clone Repository

```
git clone https://github.com/your-username/AI-Image-Detector.git
cd AI-Image-Detector
```

---

### 2. Run Backend

```
cd server
npm install
npm run dev
```

---

### 3. Run Frontend

Open new terminal:

```
cd client
npm install
npm run dev
```

---

### 4. Install Python Dependencies

```
pip install torch torchvision pillow transformers
```

---

### 5. Open App

```
http://localhost:5173
```

---

## API

### POST /detect

```json
{
  "prediction": "AI Generated",
  "confidence": 87.23,
  "explanation": "AI generation artifacts detected"
}
```

---

## Model Details

- EfficientNet (trained on CIFAKE dataset)
- 15–18 epochs training
- Uses augmentation + normalization
- Optional hybrid detection

---

## Deployment

- Frontend → Vercel
- Backend → Render

---

## Author

Satyam Kumar Solanki  
B.Tech CSE

---

## License

Educational Project
