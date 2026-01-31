# MindVault AI

A production-grade personal AI-powered notes application where users can store notes and retrieve or ask questions about them using natural language. The AI uses only the user's stored notes to answer questions (RAG-based system).

## 🎯 Project Overview

MindVault AI is a full-stack web application that combines:
- **Secure note storage** with Firebase Firestore
- **AI-powered search and Q&A** using OpenAI embeddings and RAG (Retrieval-Augmented Generation)
- **User authentication** with Firebase Auth
- **Clean, modern UI** built with React and Tailwind CSS

## 🏗️ Architecture

```
Frontend (React + Vite on Vercel)
    ↓
Serverless API (Firebase Cloud Functions)
    ↓
Firestore Database
    ↓
OpenAI API (Embeddings + Chat Completions)
```

### Tech Stack

- **Frontend**: React 18 + Vite
- **Frontend Hosting**: Vercel
- **Backend**: Firebase Cloud Functions (Node.js)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (email/password)
- **AI**: OpenAI API (embeddings + chat completions)
- **Styling**: Tailwind CSS

## 📁 Project Structure

```
mindvault-ai/
├── src/
│   ├── components/
│   │   ├── AI/
│   │   │   └── AIChat.jsx          # AI chat interface
│   │   ├── Auth/
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── Signup.jsx          # Signup page
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx       # Main dashboard
│   │   ├── Layout/
│   │   │   └── Layout.jsx          # App layout with header
│   │   └── Notes/
│   │       ├── NoteCard.jsx        # Note card component
│   │       ├── NoteForm.jsx        # Create/edit note form
│   │       └── NoteList.jsx        # Notes list view
│   ├── contexts/
│   │   └── AuthContext.jsx         # Firebase Auth context
│   ├── firebase/
│   │   └── config.js               # Firebase configuration
│   ├── services/
│   │   └── notesService.js        # Firestore notes operations
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind
├── firestore.rules                 # Firestore security rules
├── firestore.indexes.json         # Firestore indexes
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account (free tier works)
- OpenAI API key (for Phase 3)

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (disable Google Analytics if you want)

#### Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Click "Save"

#### Get Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General** tab
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app (nickname: "MindVault AI")
5. Copy the Firebase configuration object

#### Create Environment Variables

1. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

2. Fill in your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Deploy Firestore Security Rules

1. Install Firebase CLI (if not already installed):

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project:

```bash
firebase init firestore
```

4. Select your Firebase project when prompted
5. Use the existing `firestore.rules` file when asked
6. Deploy the rules:

```bash
firebase deploy --only firestore:rules
```

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 4. Test the Application

1. Navigate to the app (should redirect to `/login`)
2. Click "Sign up" to create a new account
3. After signup, you'll be redirected to the dashboard
4. Create your first note!
5. Test editing and deleting notes

### 5. Build for Production

```bash
npm run build
```

## 📋 Current Status

### ✅ Phase 1: Frontend Scaffolding (COMPLETE)

- [x] React + Vite project setup
- [x] Tailwind CSS configuration
- [x] Routing setup (React Router)
- [x] Authentication UI (Login/Signup pages)
- [x] Notes management UI (List, Create, Edit, Delete)
- [x] AI Chat interface
- [x] Clean, modern UI design

### ✅ Phase 2: Firebase Integration (COMPLETE)

- [x] Firebase SDK installation
- [x] Firebase Auth integration (signup, login, logout)
- [x] Firestore database setup
- [x] Notes CRUD operations with Firestore
- [x] Firestore security rules
- [x] Auth context provider
- [x] Notes service layer

### 🔄 Next Phases

- **Phase 3**: AI & RAG Implementation
  - OpenAI embeddings generation
  - Vector storage in Firestore
  - Similarity search
  - RAG query processing via Cloud Functions

- **Phase 4**: Deployment
  - Deploy frontend to Vercel
  - Deploy Firebase Functions
  - Environment variables setup

## 🔐 Security Notes

- OpenAI API key will be stored in Firebase Functions environment variables (never exposed to frontend)
- Firestore security rules will enforce user-based data access
- All AI processing happens server-side

## 🔐 Firestore Schema

### Notes Collection

Each document in the `notes` collection has the following structure:

```javascript
{
  userId: string,           // Firebase Auth UID
  title: string,            // Note title
  content: string,         // Note content
  createdAt: Timestamp,    // Creation timestamp
  updatedAt: Timestamp,    // Last update timestamp
  embedding: Array<number> | null  // OpenAI embedding vector (added in Phase 3)
}
```

### Security Rules

- Users can only read their own notes (`userId == request.auth.uid`)
- Users can only create notes with their own `userId`
- Users can only update/delete their own notes
- All other access is denied

## 📝 Notes

- Phase 2 is complete: Firebase Auth and Firestore are fully integrated
- Notes CRUD operations are working with real Firestore data
- Security rules ensure users can only access their own notes
- AI features (embeddings, RAG) will be added in Phase 3

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

MIT
