# Firebase Setup Guide for MindVault AI

This guide will walk you through setting up Firebase for the MindVault AI application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** (or select an existing project)
3. Enter a project name (e.g., "mindvault-ai")
4. Follow the setup wizard:
   - Google Analytics: Optional (you can disable it)
   - Click **"Create project"**
5. Wait for the project to be created, then click **"Continue"**

## Step 2: Enable Authentication

1. In the Firebase Console, click **Authentication** in the left sidebar
2. Click **"Get started"** (if you haven't enabled it yet)
3. Go to the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable the first toggle (Email/Password)
6. Click **"Save"**

## Step 3: Create Firestore Database

1. In the Firebase Console, click **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules next)
4. Select a location for your database (choose the closest to your users)
5. Click **"Enable"**

## Step 4: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to the **"Your apps"** section
4. Click the **web icon** (`</>`) to add a web app
5. Register your app:
   - App nickname: "MindVault AI"
   - Firebase Hosting: Not needed (we're using Vercel)
6. Click **"Register app"**
7. Copy the `firebaseConfig` object that appears

## Step 5: Set Up Environment Variables

1. In your project root, create a `.env` file:

```bash
# Copy the example file
cp .env.example .env
```

2. Open `.env` and fill in your Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Important:** Replace the placeholder values with your actual Firebase config values from Step 4.

## Step 6: Deploy Firestore Security Rules

1. Install Firebase CLI (if not already installed):

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

This will open a browser window for authentication.

3. Initialize Firebase in your project:

```bash
firebase init firestore
```

When prompted:
- **Select "Use an existing project"** and choose your Firebase project
- **What file should be used for Firestore Rules?** → Enter `firestore.rules`
- **What file should be used for Firestore indexes?** → Enter `firestore.indexes.json`

4. Deploy the security rules:

```bash
firebase deploy --only firestore:rules
```

You should see: "✔ Deploy complete!"

## Step 7: Verify Setup

1. Start your development server:

```bash
npm run dev
```

2. Navigate to `http://localhost:3000`
3. Try to sign up with a new account
4. After signup, you should be redirected to the dashboard
5. Create a test note
6. Verify the note appears in your Firestore database:
   - Go to Firebase Console > Firestore Database
   - You should see a `notes` collection with your note

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure your `.env` file exists and has all required variables
- Restart your dev server after creating/updating `.env`
- Check that variable names start with `VITE_`

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add your domain (e.g., `localhost` for development)

### "Permission denied" when accessing Firestore
- Make sure you've deployed the security rules: `firebase deploy --only firestore:rules`
- Check that you're logged in with Firebase Auth
- Verify the security rules in `firestore.rules` are correct

### Notes not appearing
- Check the browser console for errors
- Verify you're logged in (check Firebase Console > Authentication > Users)
- Check Firestore Console to see if notes are being created
- Verify the `userId` field matches your Firebase Auth UID

## Next Steps

Once Firebase is set up and working:
- ✅ You can create, read, update, and delete notes
- ✅ All data is secured per user
- 🔄 Next: Phase 3 - AI & RAG Implementation

## Security Notes

- Never commit your `.env` file to version control (it's in `.gitignore`)
- The Firebase config in `.env` is safe to expose in frontend code (it's public by design)
- Your Firestore security rules protect your data
- OpenAI API keys will be stored in Firebase Functions (server-side only)
