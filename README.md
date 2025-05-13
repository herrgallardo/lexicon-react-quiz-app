# 🚀 lexicon-react-quiz-app

Interactive Quiz App built with React.

⸻

## 🔐 Environment Setup: `.env.local`

To keep Firebase keys secure and flexible, we use a `.env.local` file to store environment variables.

This file is **ignored by Git**, so your secrets stay safe and are not pushed to GitHub.

---

### 📁 Step 1: Create `.env.local` in the root of your project

At the same level as `package.json`, create a file named:

```
.env.local
```

---

### 🔑 Step 2: Add your Firebase config to `.env.local`

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

> 🧠 Make sure all keys start with `REACT_APP_` — this is required by Create React App.

---

### ⚙️ Step 3: Your app will use these keys automatically

In your code (e.g. `firebaseInit.js`), access them like this:

```js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
```

---

### 🚀 Step 4: Start your app

```bash
npm start
```

Your app will now load the Firebase config securely from `.env.local`.

---

```

```
