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

> Make sure all keys start with `REACT_APP_` — this is required by Create React App.

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

## 🧪 Testing

We use **Jest** and **React Testing Library** to verify both unit and integration logic.

### ▶️ Run tests

```bash
npm test
```

This command runs all test suites under `src/__tests__` and watches for changes.

### 🗂 Test Structure

- **Unit tests** in `src/__tests__`:

  - `quizLogic.test.js` — tests pure scoring logic
  - `firestoreService.test.js` — mocks Firestore to test `saveScore`
  - `getTopScores.test.js` — mocks Firestore to test leaderboard fetch
  - `authService.test.js` — tests Firebase auth wrappers
  - `AuthContext.test.js` — tests `AuthProvider` context behavior
  - `LoginForm.test.js` — tests login, signup, and reset flows in the form

- **Mocks and setup**:

  - `src/setupTests.js` contains Jest mocks for:

    - Firebase (`firebase/auth`, `firebase/firestore`)
    - `react-router-dom` components and hooks
    - `axios` HTTP client
    - `window.alert`

### ✍️ Writing new tests

1. **Create a test file** alongside your feature, e.g. `MyFeature.test.js` in `src/__tests__`.
2. **Import** the function or component under test.
3. **Arrange** any required mocks (Firestore, Auth, API calls).
4. **Act** by invoking the function or rendering the component.
5. **Assert** expected behavior with Jest matchers (e.g. `toHaveBeenCalledWith`, `toEqual`).

---
